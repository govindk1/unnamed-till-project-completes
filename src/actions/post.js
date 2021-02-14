import axios from 'axios';
import { setAlert } from './alert';
import {
  POST_ERROR, 
  ADD_POST,
  GET_POSTS,
  DELETE_POST,
  EDIT_POST
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


const getposts = (props) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.token,
    },
  };

  try{
    const  res = await axios.get('http://127.0.0.1:5000/userOrder/order', config)
    console.log(res.data)
    dispatch({
        type:GET_POSTS,
        payload:res.data,
    })
  }
    catch(err){
      dispatch({
          type:POST_ERROR,
      })
      dispatch(setAlert(err.response.data.message, "danger"))
  }
    
}

const deletepost = (id) => async (dispatch) => {
  const config = {
    headers:{
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.token
    }
  };
    try{
    await axios.delete(`http://localhost:5000/userOrder/order/${id}`, config)

    dispatch({
      type:DELETE_POST,
      payload:id,
    })

    }
    catch(err){
      dispatch({
        type:POST_ERROR,
      })
      dispatch(alert(err.response.data.message, "danger"))
    }
  }

  const editpost = (props) => async (dispatch) => {

    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.token
      }
    };

    try{
      
      const res = await axios.post(`http://localhost:5000/userOrder/update/${props.id}`,props, config)
      
      dispatch({
        type:EDIT_POST,
        payload: res.data,
      })
      dispatch(setAlert("edited successfully", "success"))
    }
    catch(err){
      dispatch(setAlert("Some error occurs", "success"))
    }

  }






export  {addpost, getposts, deletepost, editpost}