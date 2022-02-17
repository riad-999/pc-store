import { useEffect, useState, useReducer, useContext, createContext } from "react";
import reducer from "../reducers/cartReducer";
import { shippingFee } from "../utils/constants";
import {
    ADD_TO_CART,
    ALTER_QUANTITY,
    REMOVE_PRODUCT,
    CLEAR_CART
} from "../utils/actions";
import { isOnServer } from '../utils/helpers';
import { BsDisplay } from "react-icons/bs";
const init = {
    cart: [],
    totalItems: 0,
    totalAmount: 0,
    shippingFee
};
const getCart = () => {
    if(isOnServer())
        return init;
    if(localStorage.getItem('cart'))
        return JSON.parse(localStorage.getItem('cart'));
    return init;
}

const initialState = getCart();
const cartContext = createContext();

export const CartProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(state));
    },[state.cart]);

    const addToCart = (product,quantity) => {
        dispatch({type: ADD_TO_CART, payload:{product, quantity}});
    }
    const alter_product_quantity = (id,flag) => {
        dispatch({type:ALTER_QUANTITY,payload: {id,flag}});
    }
    const removeProduct = (id) => {
        dispatch({type:REMOVE_PRODUCT,payload:id});
    }
    const clearCart = () => {
        dispatch({type: CLEAR_CART});
    }

    return <cartContext.Provider value={{
        addToCart,
        alter_product_quantity,
        removeProduct,
        clearCart,
        ...state
    }}>
        {children}
    </cartContext.Provider>
}

export const useCartContext = () => {
    return useContext(cartContext);
}