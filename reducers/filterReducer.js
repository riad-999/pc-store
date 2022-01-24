import { SET_PRODUCTS } from "../utils/actions";

export const reducer = (state,action) => {
    if(action.type === SET_PRODUCTS){
        return {
            ...state,
            products: action.payload
        };
    }
}