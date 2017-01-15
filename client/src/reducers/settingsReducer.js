import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.settings, action) {
	switch(action.type) {
		case types.GET_SETTINGS: 
		case types.SAVE_SETTINGS:{
			return {...state, city: action.payload.city, state: action.payload.state, email: action.payload.email};
		}
		case types.CHANGE_PASSWORD:{
			return state;
		}
	}
	
  return state;
}