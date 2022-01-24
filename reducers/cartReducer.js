import { ADD_TO_CART } from "../utils/actions";

const reducer = (state,action) => {
    if(action.type === ADD_TO_CART) {
        const {id,name,price,images,quantity: max} = action.payload;
        const CartProduct = {
            id,name,price,images,max,quantity: 1
        };
        return {
            ...state,
            totalItems: state.totalItems + 1,
            totalAmount: state.totalAmount + action.payload.price,
            cart: [...state.cart, CartProduct]
        };
    }
    return state;
}

export default reducer;