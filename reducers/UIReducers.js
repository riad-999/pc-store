import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from '../utils/actions';

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
    return state;
}

export default UIReducer;