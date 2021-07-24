import React, { useState, useReducer, useEffect } from 'react';
import './css/App.css';

import AuthContext from './context/auth_context';
import {LOGGED_IN, LOGGED_OUT, initialState, loggedInReducers } from './reducers/loggedInReducers';

import CartContext from './context/cart_context';
import { quantityInitState, SET_QUANTITY, cartQuantityReducers} from './reducers/cartQuantityReducers';
import getCartQuantity from './helper_functions/get_cart_quantity';

import Header from './components/header/Header';

import Home from './components/home/Home';
import SignUp from './components/registration/SignUp';
import Login from './components/registration/Login';
// import Menu from './components/menu/Menu';
// import Category from './components/menu/Category';
// import Product from './components/menu/Product';

import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routesConfig';
import checkAuth from './helper_functions/check_auth';

import { parseCookie } from './helper_functions/cookie_parser';

import ProtectedRoute from './components/ProtectedRoute';
import ShoppingCart from './components/shopping_cart/ShoppingCart';
import UserProfile from './components/user_profile/UserProfile';
import PageNotFound from './components/PageNotFound';
 
function App() {
  const [authState, dispatch] = useReducer(loggedInReducers, initialState);
  const [quantityState, dispatchQuantityState] = useReducer(cartQuantityReducers, quantityInitState);
  
  // when reload the page, keep the state when the user is already logged in
  if (document.cookie && !authState.loggedIn) {
    console.log('here');
    const userObj = parseCookie(document.cookie);
    if ('id' in userObj && 'name' in userObj) {
      dispatch({ 
        type: LOGGED_IN, 
        id: userObj['id'],
        name: userObj['name']
      });
    }
  }
  
  
  useEffect(async () => {
    const interval = setInterval(async () => {
      // check whether the user is logged in every second
      
      // console.log(authState.loggedIn);
      if (authState.loggedIn) {
        // console.log(authState.loggedIn);

        let isAuthenticated = await checkAuth();
       
        if (!isAuthenticated && authState.loggedIn) {
          // The server has expired the token but loggedIn is still true
          dispatch({type: LOGGED_OUT});
          // console.log('session has been timed out');
          
          // will make with better UI later
          console.log('token has been expired');

          // temporary measure. There should be better way than this to fix logged in state bug.
          window.location.reload();
        }
       
      }
    
    }, 1000);

    let quantity = await getCartQuantity();
    dispatchQuantityState({type: SET_QUANTITY, cartQuantity: quantity});

    return () => clearInterval(interval);
  }, [authState.loggedIn, quantityState.cartQuantity]);

  return (
    <AuthContext.Provider
      value = {{ 
        authState: authState,
        dispatch: dispatch
      }} 
    >
      <CartContext.Provider
        value = {{ 
          quantityState: quantityState,
          dispatchQuantityState: dispatchQuantityState
        }} 
      >
        <div>
          
          <Header />

          <Switch>
            {/* for menu routes  */}
            {routes.map(({ path, name, Component }, key) => (
              <Route
                exact
                path={path}
                key={key}
                render={props => {
                  // get all routes that include the current route
                  const filteredCrumbs = routes.filter(({ path }) => props.match.path.includes(path));
                  
                  // replace dynamic routes with their params
                  // eg. '/menu/:mainCategoryId/:categoryId' -> '/menu/60a578758038e2335f87ea16/60a69ac20628c03911b6e819' 
                  let crumbs = filteredCrumbs.map(({ path, ...rest}) => ({
                    path: Object.keys(props.match.params).length
                            ? Object.keys(props.match.params).reduce(
                              (path, param) => path.replace(
                                `:${param}`, props.match.params[param]
                              ), path
                              )
                            : path,
                    ...rest
                  }))

                  // consider query string if a url has it.
                  const queryString = props.location.search;
                  if (queryString !== "") {
                    const searchParams = new URLSearchParams(queryString);

                    const namesStr = searchParams.get('parent');
                    if (namesStr) {
                      const names = namesStr.split('/');
                      // console.log('names');
                      // console.log(names);
                      crumbs = crumbs.map(({ name, path, ...rest }, indx) => {
                      
                        if (indx !== 0) {
                          return {
                            name: names[indx],
      
                            // attach query string to path
                            path: path + queryString,
                            ...rest
                          }
                        }
                        return {
                          name: names[indx],
                          path: path,
                          ...rest
                        }
                        
                      });
                    }
                      
                    
                  }

                  // console.log(`Generated crumbs for ${props.match.path}`);
                  // crumbs.map(({ name, path }) => console.log({ name, path }));
                  return (
                    <Component {...props} crumbs={crumbs}/>
                  );
                }}
              />
            ))}


            
            <Route exact path="/login">
              <Login /> 
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>

            
            <Route exact path="/">
              <Home />
            </Route>

          
            <ProtectedRoute 
              exact 
              path='/profile' 
              component={UserProfile} />

            <ProtectedRoute 
              exact 
              path='/shopping-cart' 
              component={ShoppingCart} />
          
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>

        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
