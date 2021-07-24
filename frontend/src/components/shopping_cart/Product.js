import React from 'react';
import axios from 'axios';

import useCartQuantity from '../../hooks/useCartQuantity';

const Product = ({product, getCart}) => {
    const { updateQuantity: updateCartQuantity} = useCartQuantity();
    
    const handleDeleteProduct = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/cart/${product._id}`;
        axios.delete(url, { withCredentials: true, credentials: 'include'})
        .then(response => { 
            console.log(response.data);
            // setCartProducts(response.data);
            getCart();
            updateCartQuantity();
        })
        .catch(err => {
            console.log(err.response);
        });
    };

    const handleUpdateQuantity = (e) => {
       
        const url = `${process.env.REACT_APP_SERVER_URL}/cart/${product._id}`;
        axios.patch(url,{
            "quantity": parseInt(e.target.value)
        }, { withCredentials: true, credentials: 'include'})
        .then(response => { 
            console.log(response.data);
            // setCartProducts(response.data);
            getCart();
            updateCartQuantity();
        })
        .catch(err => {
            console.log(err.response);
        });
    };
    
    
    return (
        <div className="cart-product-container">
            <div>
                <div>
                    <div className="cart-product-img-container">
                        <img 
                            src={`${process.env.REACT_APP_SERVER_URL}/resources/${product.productDetails.imagePath}`} 
                            alt={`${product.productDetails.productName}`} 
                            title={`${product.productDetails.productName}`} 
                        />
                    </div>
                    <div>
                        <p>{product.productDetails.status}</p>
                    </div>
                </div>
                
                <div className="cart-product-info">
                    
                    <p className="cart-product-name">{product.productDetails.productName}</p>
                    
                    <div>
                        <label>Quantity: </label>
                        <select
                            value={product.quantity}
                            onChange={handleUpdateQuantity}
                        >
                            {
                                (Array.from({length: 50}, (_, i) => i + 1)).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        product.size && (
                            <p>Size: {product.size}</p>
                        )
                    }
                    
                </div>
                <div>
                    <p>Price: <span className="price-text">{product.productDetails.price} MMK</span></p>
                </div>
            </div>
            <div>
                <button className="delete-btn" onClick={handleDeleteProduct}>Delete</button>
            </div>
        </div>
    );
};

export default Product;
