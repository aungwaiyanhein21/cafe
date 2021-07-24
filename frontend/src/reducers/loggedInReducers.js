
export const LOGGED_IN = 'loggedIn';
export const LOGGED_OUT = 'loggedOut';

export const initialState = {
    loggedIn: false,
    id: "",
    name: ""
};

export const loggedInReducers = (state, action) => {
    switch(action.type) {
        case LOGGED_IN:
            return {
                ...state,
                loggedIn: true,
                id: action.id,
                name: action.name
            };
        case LOGGED_OUT:
            return {
                loggedIn: false,
                id: "",
                name: ""
            };
        default: 
            return state;
    }
};