import React from "react"
import {SET_ALERT, REMOVE_ALERT} from "../actions/types.js"

const initial_state = [];

const alert = (state = initial_state, action) => {
    const {type, payload} = action
    switch(type){
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}

export default alert;