import {LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, REGISTER_FAIL, LOG_OUT} from "./types.js";
import axios from "axios"
import {setAlert} from "../actions/alert.js"

// //structure is like this
// function register(a, b, c){
//     function(dispatch){
//         return something
//     }
// }

// //i dont need this register function because it is not affecting the reducer state and even it is not dispatching any state related to this function simply i have to post using axios but anyways it's kinda look sexy
// const forgetpassword = (email) => async(dispatch) => {
    
//     try{
//         const res = await axios.post('http://127.0.0.1:5000/user/forgot-pwd', {email})
//         dispatch(alert)
//     }
//     catch(err){

//     }


// }


const loaduser = () => async (dispatch) =>{
   
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.token,
        },
      };
    try{
        const  res = await axios.get('http://127.0.0.1:5000/user/user_info', config)
        
        dispatch({
            type:LOAD_USER,
            payload: res.data,
        })
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR,
          });
    }
}


const login = (email, password) => async (dispatch) => {

    try{
        const res = await axios.post('http://127.0.0.1:5000/user/login', {email, password});


        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data    
        })

        //after login loading user data
        dispatch(loaduser())

    }
    catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type: LOGIN_FAIL,
          });
    }

}

//i dont need this register function because it is not affecting the reducer state simply i have to post using axios but anyways it's kinda look sexy
//once check forgotpassword.js 
const register = (username, email, password) => async (dispatch) => {

   
    try{
        const res = await axios.post('http://127.0.0.1:5000/user/signup', { email, password, username});
        dispatch(setAlert(res.data.message, 'success'))
    }
    catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
        dispatch({
            type: REGISTER_FAIL,
          });
    }


}

export const logout = () => (dispatch) => {
    dispatch({ type: LOG_OUT });
  };
  

export {register, login, loaduser}