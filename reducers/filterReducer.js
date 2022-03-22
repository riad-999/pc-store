import { 
    SET_PRODUCTS,
    CHANGE_SORT,
    FILTER_PRODUCTS,
    SORT_PRODUCTS,
    CHANGE_FILTERS,
    CLEAR_FILTERS
} from "../utils/actions";

export const reducer = (state,action) => {
    if(action.type === SET_PRODUCTS){
        const products = action.payload;
        const prices = products.map(product => product.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return {
            ...state,
            products: action.payload,
            filteredProducts: action.payload,
            filters: {
                ...state.filters,
                price: max,
                maxPrice: max,
                minPrice: min
            }
        };
    }
    if(action.type === CHANGE_SORT) {
        return {
            ...state,
            sort: action.payload
        };
    }
    if(action.type === SORT_PRODUCTS) {
        const {filteredProducts,sort} = state;
        let orderdProducts = null;
        if(sort === 'score') {
            orderdProducts = filteredProducts.sort((a,b) => b.score - a.score);
            return {
                ...state,
                filteredProducts: orderdProducts
            };
        }
        if(sort === 'A-Z') {
            orderdProducts = filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
            return {
                ...state,
                filteredProducts: orderdProducts
            };
        }
        if(sort === 'Z-A') {
            orderdProducts = filteredProducts.sort((a,b) => b.name.localeCompare(a.name));
            return {
                ...state,
                filteredProducts: orderdProducts
            };
        }
        if(sort === 'desc-price') {
            orderdProducts = filteredProducts.sort((a,b) => b.price - a.price);
            return {
                ...state,
                filteredProducts: orderdProducts
            };
        }
        if(sort === 'asc-price') {
            orderdProducts = filteredProducts.sort((a,b) => a.price - b.price);
            return {
                ...state,
                filteredProducts: orderdProducts
            };
        }
    }
    if(action.type === CHANGE_FILTERS) {
        const {name,value} = action.payload;
        return {
            ...state,
            filters: {
                ...state.filters,
                [name]: value
            }
        };
    }
    if(action.type === FILTER_PRODUCTS) { 
        const {category,price,search} = state.filters;
        let filteredProducts = [...state.products];
        if(category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
            console.log('pish');
        }
        if(search) {
            filteredProducts = filteredProducts.filter(product => product.name.includes(search));
        }
        filteredProducts = filteredProducts.filter(product => product.price <= price);
        return {
            ...state,
            filteredProducts
        };
    }
    if(action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filteredProducts: state.products,
            view: '',
            sort: 'score',
            filters: {
                ...state.filters,
                category: 'all',
                review: 'all',
                price: state.filters.maxPrice
            }
        };
    }
}