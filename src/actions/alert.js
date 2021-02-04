//so whenever we get an error or something we will dispatch our action
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';


export const setAlert = (msg, alertType) => (dispatch) => {

    const id = uuidv4(); //for every alert we are giving an id that will help us to remove alert
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    
    //after 3 second i will remove the alert with the given id
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, 3000);
  };

  export default setAlert;