import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import useCartQuantity from '../../hooks/useCartQuantity';

const Nav = ({ open, setOpen }) => {
    
    const {isLoggedIn, name, logout} = useAuth();

    const { quantity } = useCartQuantity();

    const isQuantityGreaterThan10 = quantity > 10;

   
    // useEffect(() => {
    //     console.log(isLoggedIn);
    // }, [isLoggedIn])

    const handleLogout = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/logout`;
        const info = await axios.get(url, { withCredentials: true, credentials: 'include'});
        if (info) {
            if (info.data.hasLoggedOut) {
                logout();
    
                setOpen(false);
            }
           

        }
    };

    return (
        <nav className={open? "open": "close"}>
            <ul>
                <li>
                    <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
                </li>

                {
                    isLoggedIn ? 
                    (<>
                        <li>
                            <Link to="/profile" onClick={() => setOpen(false)}>
                                {name}
                            </Link>
                        </li>
                        <li>
                            <Link className="btn" to="/" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                       
                    </>)
                   
                    :
                    (<>
                        <li>
                            <Link className="btn login" to="/login" onClick={() => setOpen(false)}>
                                Login
                            </Link>
                            
                        </li>
                        <li>
                            <Link className="btn signup" to="/signup" onClick={() => setOpen(false)}>
                                Sign Up
                            </Link>
                        </li>
                    </>)
                }
               
                <li>
                    
                    <Link to="/shopping-cart" onClick={() => setOpen(false)}>
                        {quantity !== 0 && 
                            (
                                <span className="cart-item-num cart-item-animate">
                            
                                    {
                                    isQuantityGreaterThan10 ? 
                                    <>10+</>
                                    :
                                    <>{quantity}</>
                                        
                                    }
                                </span>
                            )
                        }
                      
                        <FontAwesomeIcon icon={faShoppingCart} size="lg"/>
                    </Link>
                    
                </li>
            </ul>
        </nav>
    );

   
};

export default Nav;

