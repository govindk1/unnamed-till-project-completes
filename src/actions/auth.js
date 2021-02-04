import {LOGIN_SUCCESS, LOGIN_FAIL} from "./types.js";
import axios from "axios"
import {setAlert} from "../actions/alert.js"

// //structure is like this
// function register(a, b, c){
//     function(dispatch){
//         return something
//     }
// }

const login = (email, password) => async (dispatch) => {

    try{
        const res = await axios.post('http://127.0.0.1:5000/user/login', {email, password});

        dispatch(setAlert('login success', 'success'))

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data    
        })

    }
    catch(err){
        dispatch(setAlert(err.response.data.message, 'danger'))
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
            type: LOGIN_FAIL,
          });
    }


}

export {register, login}