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
import { isOnServer } from '../utils/helpers';

const UIReducer = (state,action) => {
    const {type} = action;
    if(type === OPEN_SIDEBAR) {
        return {
            ...state,
            isSidebarOpen: true
        }
    }
    if (type === CLOSE_SIDEBAR) {
        return {
            ...state,
            isSidebarOpen: false
        }
    }
    if(type === AUTHENTICATE) {
        return {
            ...state,
            isAuth: true
        }
    }
    if(type === LOGOUT) {
        if(!isOnServer()) {
            localStorage.removeItem('user');
        }
        return {
            ...state,
            isAuth: false,
            user: {}
        }
    }
    if(type === SET_AUTH) {
        return {
            ...state,
            isAuth: action.payload
        };
    }
    if(type === SET_ALERT){
        return {
            ...state,
            alert: action.payload
        };
    }
    if(type === SET_ERROR){
        return {
            ...state,
            error: action.payload
        };
    }
    if(type === SET_USER){
        return {
            ...state,
            user: action.payload
        };
    }
    return state;
}

export default UIReducer;