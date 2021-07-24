import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Registration.css';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormMessage from './FormMessage';

import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
   

    const {isLoggedIn, login} = useAuth();


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_SERVER_URL}/login`;
        axios.post(url, {
            "email": email,
            "password": password
        }, { withCredentials: true, credentials: 'include'})
        .then(receivedInfo=> {
            console.log('logged in');
            console.log(receivedInfo.data);

            login();
        })
        .catch(err => {
            console.log(err.response);

            setErrors(err.response.data.errors);

        });   
    };

    return (
        <>
            {isLoggedIn &&  <Redirect to="/" />}
            
            <div className="container">
                <div className="form-container">
                    <div>
                        <h1 className="form-title">Login</h1>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        {
                           
                            errors && Object.keys(errors).map(key => (
                                
                                errors[key] !== '' && (
                                    <section key={key}>
                                        <FormMessage hasError={true} message={`${errors[key]}`}/>
                                    </section>
                                )
                               
                            ))
                            
                        }
                        
                        <section>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="true"
                            />
                        </section>
                        <section>
                            <label>Password:</label>
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="true"
                            />
                        </section>
                        <section>
                            <div>
                                <Link className="form-link" to="/forgot-password">Forgot your password?</Link>
                            </div>
                        </section>
                        <section>
                            <div>
                                <Link className="form-link" to="/signup">No account yet?</Link>
                            </div>
                        </section>
                    
                        <div className="btn-container">
                            <input type="submit" className="form-btn" value="Login"/>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

// import { useCookies } from 'react-cookie';
// const [cookies, setCookie] = useCookies(['user']);
// setCookie('firstName', receivedInfo.data.user.firstName, { path: '/' });
// setCookie('lastName', receivedInfo.data.user.lastName, { path: '/' });