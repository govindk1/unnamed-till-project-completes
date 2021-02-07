import axios from 'axios';
import { setAlert } from './alert';
import {
  POST_ERROR, 
  ADD_POST,
  GET_POSTS,

} from './types';


const addpost = (props) => async (dispatch) => {
    
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.token,
        },
      };
      try{
        const  res = await axios.post('http://127.0.0.1:5000/userOrder/order',{...props}, config)
        dispatch({
            type:ADD_POST,
            payload:res.data,
        })
        dispatch(setAlert("placed successfully", "success"))
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
        })
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}


export  {addpost}