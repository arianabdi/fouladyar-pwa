// actions/authActions.js

export const SET_PRODUCTS = 'SET_PRODUCTS';


export const setLoadedProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});


