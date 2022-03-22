import { useContext, createContext, useReducer, useEffect} from 'react';
import UIReducer from '../reducers/UIReducers';
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    AUTHENTICATE,
    LOGOUT,
    SET_ALERT,
    SET_IS_ADMIN,
    SET_AUTH,
    SET_ERROR,
    SET_USER
} from '../utils/actions';
import { useRouter } from 'next/router';
import axios from 'axios';
import { authUrl, logoutUrl} from '../utils/constants';
import { request } from '../utils';

const UIContext = createContext();

const initialState = {
    isSidebarOpen: false,
    isAuth: null,
    isAdmin: null,
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
    const setIsAdmin = (isAdmin) => {
        dispatch({type: SET_IS_ADMIN,payload: isAdmin});
    }
    const auth = async () => {
        const {success,response} = await request(authUrl);
        if(!success) {
            if(response) {
                if(response.status === 401) {
                    setIsAuth(false);
                    setIsAdmin(false);
                }
            }
            else {
                router.push('/error');
            }
        }
        else {
            setIsAuth(true);
            if(response.data.isAdmin) {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        }
    }
    const logout = async () => {
        try{
            setIsAuth(null);
            setIsAdmin(null);
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
    useEffect(() => {
        auth();
    },[]);

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
                setUser,
                setIsAdmin
            }
        }>
            {children}
        </UIContext.Provider>
    );
}

export const UseUIContext = () => {
    return useContext(UIContext);
}