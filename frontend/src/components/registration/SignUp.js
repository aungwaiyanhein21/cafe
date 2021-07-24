import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Registration.css';

import { Redirect } from 'react-router-dom';
import FormMessage from './FormMessage';

import axios from 'axios';

import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState(null);

    const {isLoggedIn, login} = useAuth();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setSuccess(null);
        setErrors(null);

        const url = `${process.env.REACT_APP_SERVER_URL}/signup`;
        axios.post(url, {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        }, { withCredentials: true, credentials: 'include'})
        .then(receivedInfo=> {
            console.log('created an account');
            console.log(receivedInfo.data);

            setSuccess(receivedInfo.data.message);

            // reset all fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');

            // setIsLoggedIn(true);
  
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
                        <h1 className="form-title">Create an account</h1>
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

                        {  
                            success && (
                                <section>
                                    <FormMessage hasError={false} message={`${success}`}/>
                                </section>
                            )
                                
                            
                        }


                        <section>
                            <label>First Name:</label>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete="true"
                            />
                        </section>
                        <section>
                            <label>Last Name:</label>
                            <input 
                                type="text" 
                                placeholder="Last Name"
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete="true"
                            />
                        </section>
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
                                <Link className="form-link" to="/login">Already have an account?</Link>
                            </div>  
                        </section>
                    
                        <div className="btn-container">
                            <input type="submit" className="form-btn" value="Sign Up"/>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;