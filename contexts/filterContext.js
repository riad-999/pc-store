import { useContext, createContext, useReducer, useEffect } from "react";
import { 
    SET_PRODUCTS,
    CHANGE_SORT,
    FILTER_PRODUCTS,
    SORT_PRODUCTS,
    CHANGE_FILTERS,
    CLEAR_FILTERS
} from "../utils/actions";
import { reducer } from "../reducers/filterReducer";

export const filterContext = createContext();
const initialState = {
    products : [],
    filteredProducts: [],
    view: '',
    sort: 'score',
    filters: {
        search: '',
        category: 'all',
        review: 'all',
        price: 999,
        maxPrice: 999,
        minPrice: 999,        
    }
};

export const FilterProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    const setProducts = (products) => {
        dispatch({type: SET_PRODUCTS, payload: products});
        dispatch({type: SORT_PRODUCTS});
    }
    const setSort = (sortType) => {
        dispatch({type: CHANGE_SORT,payload: sortType});
        dispatch({type: SORT_PRODUCTS});
    }
    const changeFilters = (name,value) => {
        dispatch({type: CHANGE_FILTERS, payload: {name,value}});
    }
    const clearFilters = () => {
        dispatch({type: CLEAR_FILTERS, payload: initialState});
    }
    useEffect(() => {
        dispatch({type: FILTER_PRODUCTS});
        dispatch({type: SORT_PRODUCTS});
    },[state.filters]);
    return <filterContext.Provider value={{
        ...state,
        setProducts,
        setSort, 
        changeFilters,
        clearFilters
    }}>
        {children}
    </filterContext.Provider>
}

export const useFilterContext = () => {
    return useContext(filterContext);
}