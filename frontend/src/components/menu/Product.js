import React, { useEffect, useState } from 'react';
import '../../css/Menu.css';

import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';

import BreadCrumbs from './BreadCrumbs';

import FormMessage from '../registration/FormMessage';

import useAuth from '../../hooks/useAuth';
import useCartQuantity from '../../hooks/useCartQuantity';

// Eg.  Product -> Caffe Americano
const Product = ({ crumbs }) => {
    const { updateQuantity: updateCartQuantity} = useCartQuantity();

    const [productData, setProductData] = useState(null);
    const [cupSize, setCupSize] = useState('mediumCupPrice');
    const [quantity, setQuantity] = useState(1);

    let { mainCategoryId, categoryId, subCategoryId, productId } = useParams();

    const location = useLocation();

    const [isAdded, setIsAdded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { isLoggedIn } = useAuth();

    useEffect(() => {
       
        if (location.state === undefined) {
            // get the data using the id
            
            axios.get(`${process.env.REACT_APP_SERVER_URL + `/main-category/${mainCategoryId}/categories/${categoryId}`}/sub-categories/${subCategoryId}/products/${productId}`)
            .then(result => {
                console.log(result.data);
                setProductData(result.data);

            })
            .catch(err => {
                console.log(err);
            });
        
        }
        else {
            // console.log(location.state.product);

            // already have the data from previous page so save it.
            setProductData(location.state.product);
        }
        
        // console.log(location);

    }, []);


    // when add to cart is clicked
    const handleAddToCart = () => {
        
        if (isLoggedIn) {
            console.log('adding to cart...');

            setIsAdded(true);

            // 
            const url = `${process.env.REACT_APP_SERVER_URL}/cart`;
            axios.post(url, {
                "menuIds": {
                    "mainCategoryId": mainCategoryId,
                    "categoryId": categoryId,
                    "subCategoryId": subCategoryId,
                    "productId": productId
                },
                "choice" : productData.priceOption === 'Drink' ? cupSize: "otherPrice",
                "quantity": quantity
            }, { withCredentials: true, credentials: 'include'})
            .then(data => { 
                setTimeout(() => {
                    setIsAdded(false);
                }, 3000);
                updateCartQuantity();
            })
            .catch(err => {
                console.log(err.response);
            });

        }
        else {
            setHasError(true);

            setTimeout(() => {
                setHasError(false);
            }, 3000);
        }

      
    };

    
    return (
        <>
            {
                (isAdded || hasError) && (
                    <div className="message-container animate">
                        {
                            isAdded &&  <FormMessage hasError={false} message="Added to Cart"/>
                        }
                        {
                            hasError && <FormMessage hasError={true} message="You need to be logged in to continue"/>
                        }
                       
                    </div>
                )

            }
          
            <div className="bottom-fixed-container">
                
                {
                    productData && (productData.priceOption !== 'Drink' ?
                    (
                        <p className="price-text">Price: {productData.price.otherPrice} MMK</p>
                    )
                    :
                    (
                        <p className="price-text">Price: {productData.price[cupSize]} MMK</p>
                    ))
                }
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            {productData === null && 
                <p>Loading...</p>
            }
            {
                productData && (
                    <div className="menupage-container">
                        <div className="menu-container">
                            <div>
                                <BreadCrumbs crumbs={crumbs}/>
                                <h1>{productData.productName}</h1>
                            </div>
                            <div className="product-detail-container">
                                <div>
                                    <div className="product-image-container">
                                        <img 
                                            src={`${process.env.REACT_APP_SERVER_URL}/resources/${productData.imagePath}`}
                                            alt={`${productData.productName}`} 
                                            title={`${productData.productName}`} 
                                            // onError={(ev) => ev.target.src = `${process.env.REACT_APP_SERVER_URL}/resources/default/default.jpg`}
                                            
                                        />
                                    </div>
                                    <div className="product-info-container">
                                        {
                                            productData.description.split('\n').map((description, indx) => (
                                                <h2 key={indx}>{description}</h2>
                                            ))
                                        }
                                       
                                    </div>
                                   
                                </div>
                               
                                <div className="customization-container">
                                    {
                                        productData.priceOption === 'Drink' &&
                                        (
                                            <h2>Customization</h2>
                                        )
                                    }
                                   
                                    <section className="customization-section">
                                        {
                                            productData.priceOption === 'Drink' &&
                                            (
                                                <div>
                                                    <label>Size: </label>
                                                    <select
                                                        value={cupSize}
                                                        onChange={(e) => setCupSize(e.target.value)}
                                                    >
                                                        <option value="smallCupPrice">Small</option>
                                                        <option value="mediumCupPrice">Medium</option>
                                                        <option value="largeCupPrice">Large</option>
                                                    </select>
                                                </div>
                                            )
                                        }

                                        <div>
                                            <label>Quantity: </label>
                                            <select
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            >
                                                {
                                                    (Array.from({length: 50}, (_, i) => i + 1)).map(num => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        
                                    
                                    </section>
                                    
                                </div>
                            </div>

                        </div>
                       
                    </div>
                )
            }
            
        </>
    );
};

export default Product;