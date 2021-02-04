import {LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT} from "../actions/types.js";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
}

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS: 
            localStorage.setItem('token', payload.token);
            return {...initialState, isAuthenticated:true, loading:false, user:payload};
        
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token');
            return { ...state, token: null, isAuthenticated: false, loading: false };
        default:
            return state;
    }
}

export default auth;
