import {LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, LOAD_USER, AUTH_ERROR, REGISTER_FAIL} from "../actions/types.js";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    verify:0,
    role:"user",
    user: null,
}

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case LOAD_USER:
            return {...initialState, isAuthenticated: true, loading: false, user: payload, role: payload.role, verify:payload.verify}

        case LOGIN_SUCCESS: 
            localStorage.setItem('token', payload.token);
            return {...initialState, isAuthenticated:true, loading:false, token:payload.token};
        
        case LOGIN_FAIL:
        case LOG_OUT:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return { ...state, token: null, isAuthenticated: false, loading: false, role:"user" };
        default:
            return state;
    }
}

export default auth;
