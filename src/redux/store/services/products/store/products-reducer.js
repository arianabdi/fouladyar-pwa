import {SET_PRODUCTS} from "./products-actions";


const initialState = {
    items: []
};


export const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                items: action.payload
            }
        default:
            return state;
    }
};

export default ProductsReducer;
