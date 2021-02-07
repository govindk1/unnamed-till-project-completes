import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    loading: true,
    error: {},
  };


const post =  (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_POSTS:
        return { ...state, posts: payload, loading: false };
    
      case POST_ERROR:
        return { ...state, error: payload, loading: false };

      case ADD_POST:
        return { ...state, posts: [payload, ...state.posts], loading: false };
      
      case DELETE_POST:
          return {
            ...state,
            posts: state.posts.filter((post) => post._id !== payload),
            loading: false,
          };
      case EDIT_POST:
        return{
          ...state,
          posts:state.posts.map(obj => payload._id === obj._id ? payload : obj),
          loading: false
        }
      default:
        return state;
    }
  };

export default post