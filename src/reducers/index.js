import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post'

export default combineReducers({ 
    alert,  //it is like alert:alert so you can access it by alert key
    auth,
    post    
});