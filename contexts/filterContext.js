import { useContext, createContext, useReducer } from "react";
import { SET_PRODUCTS } from "../utils/actions";
import { reducer } from "../reducers/filterReducer";

export const filterContext = createContext();
const initialState = {
    products : []
};

export const FilterProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    const setProducts = (products) => {
        dispatch({type: SET_PRODUCTS, payload: products});
    }
    return <filterContext.Provider value={{
        ...state,
        setProducts
    }}>
        {children}
    </filterContext.Provider>
}

export const useFilterContext = () => {
    return useContext(filterContext);
}