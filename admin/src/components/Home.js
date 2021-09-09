import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <Link to="/menu">
                <div className="btn">
                    <p>Menu</p>
                </div>
            </Link>

            <Link to="/">
                <div className="btn">
                    <p>Employees</p>
                </div>
            </Link>

            <Link to="/">
                <div className="btn">
                    <p>Orders</p>
                </div>
            </Link>
            
            
        </div>
        
    );
};

export default Home;