import { useContext, createContext, useReducer, useEffect} from 'react';
import UIReducer from '../reducers/UIReducers';
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    AUTHENTICATE,
    LOGOUT,
    SET_ALERT,
    SET_AUTH,
    SET_ERROR,
    SET_USER
} from '../utils/actions';
import { useRouter } from 'next/router';
import axios from 'axios';
import { logoutUrl} from '../utils/constants';

const UIContext = createContext();
// let user = null;

// if(!isOnServer()) {
//     user = localStorage.getItem('user') ? localStorage.getItem('user') : null;
// }

const initialState = {
    isSidebarOpen: false,
    isAuth: null,
    error: null,
    alert : {
        type: '',
        message: '',
        show: false
    },
    user: null
};

export const UIProvider = ({children}) => {
    const router = useRouter();
    // reducer
    const [state,dispatch] = useReducer(UIReducer,initialState);
    // functions
    const openSidebar = () => {
        dispatch({type: OPEN_SIDEBAR});
    }
    const closeSidebar = () => {
        dispatch({type: CLOSE_SIDEBAR});
    }
    const setAlert = (alert) => {
        dispatch({type: SET_ALERT, payload: alert});
    }
    const setIsAuth = (auth) => {
        dispatch({type: SET_AUTH, payload: auth});
    }
    const authenticate = () => {
        dispatch({type: AUTHENTICATE});
    }
    const setError = (error) => {
        dispatch({type: SET_ERROR, payload: error});
    } 
    const setUser = (user) => {
        dispatch({type: SET_USER, payload: user})
    }
    const logout = async () => {
        try{
            setIsAuth(null);
            await axios.post(logoutUrl,{},{withCredentials: true});
            dispatch({type: LOGOUT});
        } catch(error) {
            setError({
                type: 'network error',
                message: 'netwok error, refresh the page or try later'
            });
        }
        router.push('/session/login');
    }
    //use effects
    return (
        <UIContext.Provider value={
            {
                ...state,
                openSidebar,
                closeSidebar,
                authenticate,
                logout,
                setAlert,
                setError,
                setIsAuth,
                setUser
            }
        }>
            {children}
        </UIContext.Provider>
    );
}

export const UseUIContext = () => {
    return useContext(UIContext);
}