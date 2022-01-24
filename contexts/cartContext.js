import { useEffect, useState, useReducer, useContext, createContext } from "react";
import reducer from "../reducers/cartReducer";
import { shippingFee } from "../utils/constants";
import {
    ADD_TO_CART
} from "../utils/actions";
import { isOnServer } from '../utils/helpers';

const getCart = () => {
    if(isOnServer())
        return {};
    if(localStorage.getItem('cart'))
        return JSON.parse(localStorage.getItem('cart'));
    return {
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        shippingFee
    };
}

const initialState = getCart();
console.log(initialState);
const cartContext = createContext();

export const CartProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(state));
    },[state.cart]);
    const addToCart = (product) => {
        // check if the products already exists 
        const exist = state.cart.find(prdct => prdct.id == product.id);
        if(!exist)
            dispatch({type: ADD_TO_CART, payload:product });
    }

    return <cartContext.Provider value={{
        addToCart,
        ...state
    }}>
        {children}
    </cartContext.Provider>
}

export const useCartContext = () => {
    return useContext(cartContext);
}