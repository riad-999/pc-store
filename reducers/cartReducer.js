import { 
    ADD_TO_CART,
    ALTER_QUANTITY,
    REMOVE_PRODUCT,
    CLEAR_CART
 } from "../utils/actions";
import { shippingFee } from "../utils/constants";

const reducer = (state,action) => {
    if(action.type === ADD_TO_CART) {
        const {quantity,product} = action.payload;
        const exist = state.cart.find(prdct => prdct.id == product.id);
        const {id,name,price,images,quantity: max} = product;
        const CartProduct = {
            id,name,price,images,max,quantity
        };
        if(!exist)
            return {
                ...state,
                totalItems: state.totalItems + quantity,
                totalAmount: state.totalAmount + quantity * price,
                cart: [...state.cart, CartProduct]
            };
        else {
            const newQuantity = exist.quantity + quantity > max ? max : exist.quantity + quantity;
            const diff = newQuantity - exist.quantity;
            const newCart = state.cart.map(item => {
                if(item.id !== product.id)
                    return item;
                return {
                    ...product,
                    quantity: newQuantity
                };
            }); 
            return {
                ...state,
                totalItems: state.totalItems + diff,
                totalAmount: state.totalAmount + quantity * price,
                cart: newCart
            };
        }
    }
    if(action.type === ALTER_QUANTITY) {
        const {id,flag} = action.payload;
        let num = 0;
        let diff = 0;
        const newCart = state.cart.map(product => {
            if(product.id === id) {
                if(flag === 1 && product.quantity < product.max) {
                    num++;
                    diff += product.price;
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    };
                }
                if(flag === 0 && product.quantity > 1) {
                    num--;
                    diff -= product.price;
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    };
                }
            }
            return product;
        });
        return {
            ...state,
            totalItems: state.totalItems + num,
            totalAmount: state.totalAmount + diff,
            cart: newCart
        };
    }
    if(action.type === REMOVE_PRODUCT) {
        let quantity = 0;
        let amount = 0;
        const newCart = state.cart.filter(product => {
            if(product.id != action.payload)
                return true;
            quantity = product.quantity;
            amount = product.price * product.quantity;
            return false;
        });
        return {
            ...state,
            totalItems: state.totalItems - quantity,
            totalAmount: state.totalAmount - amount,
            cart: newCart
        };
    }
    if(action.type === CLEAR_CART){
        return {
            cart: [],
            totalItems: 0,
            totalAmount: 0,
            shippingFee
        };
    }
    return state;
}

export default reducer;