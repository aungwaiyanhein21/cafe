import { useContext } from 'react';

import CartContext from '../context/cart_context'; 

import { SET_QUANTITY } from '../reducers/cartQuantityReducers';

import getCartQuantity from '../helper_functions/get_cart_quantity';

const useCartQuantity = () => {
    const cartContext = useContext(CartContext);

    const updateQuantity = async () => {
        const quantity = await getCartQuantity();
        cartContext.dispatchQuantityState({type: SET_QUANTITY, cartQuantity: quantity});
    };

    return {
        quantity: cartContext.quantityState.cartQuantity,
        updateQuantity: updateQuantity
    };

};

export default useCartQuantity;