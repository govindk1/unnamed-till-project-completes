import {
    GET_ORDER,
    
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    loading: true,
  };


const giveorder =  (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_ORDER:
        return { ...state, posts: payload, loading: false };
    

 
      default:
        return state;
    }
  };

export default giveorder