import axios from "axios"
import { setAlert } from './alert';
import {
    GET_ORDER,

} from "./types"


const getOrder = () => async (dispatch) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.token,
        },
      };
    
      try{
        const  res = await axios.get('http://127.0.0.1:5000/userOrder/getOrders', config)
        console.log(res.data)
        dispatch({
            type:GET_ORDER,
            payload:res.data,
        })
      }
        catch(err){
         
          dispatch(setAlert(err.response.data.message, "danger"))
      }
}


export {getOrder}