import React from 'react';
import { Link } from 'react-router-dom';

const NoProductMessage = ({ message }) => {
    return (
        <div className="no-product-container">
            <p>{message}</p>
            <Link to="/menu">
                <button className="standard-btn menu-btn">Check Menu</button>
            </Link>
            
        </div>
    );
};

export default NoProductMessage;