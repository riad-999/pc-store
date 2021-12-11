import { useContext, createContext, useReducer} from 'react';
import UIReducer from '../reducers/UIReducers';
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from '../utils/actions';
const UIContext = createContext();

const initialState = {
    isSidebarOpen: false
}

export const UIProvider = ({children}) => {
    // reducer
    const [state,dispatch] = useReducer(UIReducer,initialState);
    // functions
    const openSidebar = () => {
        dispatch({type: OPEN_SIDEBAR});
    }
    const closeSidebar = () => {
        dispatch({type: CLOSE_SIDEBAR});
    }
    //use effects
    return (
        <UIContext.Provider value={
            {
                ...state,
                openSidebar,
                closeSidebar
            }
        }>
            {children}
        </UIContext.Provider>
    );
}

export const UseUIContext = () => {
    return useContext(UIContext);
}