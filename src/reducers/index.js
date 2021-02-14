import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post'
import giveorder from "./giveorder"

export default combineReducers({ 
    alert,  //it is like alert:alert so you can access it by alert key
    auth,
    post,
    giveorder    
});