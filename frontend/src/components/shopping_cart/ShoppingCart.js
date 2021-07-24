import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../css/ShoppingCart.css';

import Product from './Product';
import NoProductMessage from './NoProductMessage';


const ShoppingCart = () => {
    const [cartProducts, setCartProducts] = useState(null);


    const getCart = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/cart`;
        axios.get(url, { withCredentials: true, credentials: 'include'})
        .then(response => { 
            console.log(response.data);
            setCartProducts(response.data);
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    useEffect(() => {
        getCart();
    }, []);

    const handleCheckout = () => {
        alert('Will add 3rd party payment integration later');
    };


    return (
        <>
            {cartProducts && (
                <>
                    <div className="bottom-fixed-container">
                        <p>SubTotal ({cartProducts.totalNum} items): {cartProducts.subTotal} MMK </p>
                        {
                            cartProducts.message ? (
                                <button disabled className="standard-btn disabled-btn" onClick={handleCheckout}>Checkout</button>
                            )
                            :
                            (
                                <button className="standard-btn checkout-btn" onClick={handleCheckout}>Checkout</button> 
                            )
                        }
                        
                        {/* <button className="standard-btn checkout-btn disabled-btn" onClick={handleCheckout}>Checkout</button> */}
                    </div>

                    <div className="main-container">
                        <div className="shopping-cart-container">

                            <h1>Shopping Cart</h1>

                            {
                                cartProducts.message ?
                                (
                                    <NoProductMessage message={cartProducts.message}/>
                                )
                                :
                                (
                                    
                                    <>
                                        {
                                            cartProducts.products.map(product => (
                                                <Product key={product._id} product={product} getCart={getCart}/>
                                            ))
                                        }
                                    

                                        {/* <div className="sub-total-container">
                                            <p>SubTotal ({cartProducts.totalNum} items): {cartProducts.subTotal} MMK </p>
                                        </div> */}
                                    </>
                                )
                                
                            }

                        
                        </div>
                
                    </div>
                </>
                
            )}
            
        </>
        
            
    );
};

export default ShoppingCart;