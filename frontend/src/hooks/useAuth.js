
import { useContext } from 'react';

import AuthContext from '../context/auth_context'; 

import { parseCookie } from '../helper_functions/cookie_parser';

import { LOGGED_IN, LOGGED_OUT } from '../reducers/loggedInReducers';

const useAuth = () => {
    const authContext = useContext(AuthContext);

    const login = () => {
        const userObj = parseCookie(document.cookie);

        if (authContext.authState.id === '' && authContext.authState.name === '') {
            
            authContext.dispatch({ 
                type: LOGGED_IN, 
                id: userObj['id'],
                name: userObj['name']
            });
        }
    };

    const logout = () => {
        authContext.dispatch({ type: LOGGED_OUT });
    };

    return {
        isLoggedIn: authContext.authState.loggedIn,
        id: authContext.authState.id,
        name: authContext.authState.name,
        login,
        logout
    };

};

export default useAuth;