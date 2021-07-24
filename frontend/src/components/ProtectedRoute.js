import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const { isLoggedIn } = useAuth();
    return (
        <Route {...rest} render={
            props => {
                if (isLoggedIn) {
                    return <Component {...rest} {...props}/>
                }
                else {
                    return (
                        <Redirect to="/login" />
                    )
                }
            }
        } />
      
       
    );
};

export default ProtectedRoute;



{/* <>
{
    isLoggedIn ?
    (
        props.children
       
        // <Route exact to={props.pathName}>
           
        // </Route>
    )
    :
    (
        <Redirect to="/login" />
    )
}
</> */}