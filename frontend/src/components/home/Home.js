import React from 'react';
import '../../css/Home.css';

const Home = () => {
    return (
        <div className="info-container">
            <div className="cover-photo-container">
                <div>
                    <img className="cover-photo" alt="coffee" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80" />
                </div>
                <div>
                    <h2>Something interesting about this place</h2>
                </div>
            </div>
            <div className="app-functions">
                <div className="function">
                    <div>
                        <img alt="pick up process" src="../images/PickUp.png" width="100%" />
                    </div>
                    
                    <div>
                        <h4>Order and pick up.</h4>
                        <p>
                            Simple steps: just open app, order your favorites through contactless pay and choose the best pickup method.
                        </p>
                    </div> 
                    <div>
                        <button className="standard-btn">Order now</button>
                    </div>
                    
                </div>
                <div className="function">
                    <div>
                        <img alt="pick up process" src="../images/food_delivery.jpg" width="100%" />
                    </div>
                    <div>
                        <h4>Delivery</h4>
                        <p>
                            Simple steps: just open app, order your favorites through contactless pay and choose the best pickup method.
                        </p>
                    </div> 
                    <div>
                        <button className="standard-btn">Order now</button>
                    </div>
                    
                </div>
                {/* <div className="function">
                    <div>
                        <img alt="pick up process" src="../images/food_delivery.jpg" width="100%" />
                    </div>
                    <div>
                        <h4>Delivery</h4>
                        <p>
                            Simple steps: just open app, order your favorites through contactless pay and choose the best pickup method.
                        </p>
                    </div> 
                    <div>
                        <button className="btn">Order now</button>
                    </div>
                    
                </div> */}
                
            </div>
            <div>Container 3</div>
        </div>
    );
};

export default Home;