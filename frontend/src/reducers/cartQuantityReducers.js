export const SET_QUANTITY = 'setQuantity';

export const quantityInitState = {
    cartQuantity: 0
};

export const cartQuantityReducers = (state, action) => {
    switch(action.type) {
        case SET_QUANTITY:
            return {
                cartQuantity: action.cartQuantity
            };
        default: 
            return state;
    }
};