import {LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, REGISTER_FAIL} from "./types.js";
import axios from "axios"
import {setAlert} from "../actions/alert.js"

// //structure is like this
// function register(a, b, c){
//     function(dispatch){
//         return something
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

export {register, login}