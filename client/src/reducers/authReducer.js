import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.auth, action) {
  switch(action.type) {
    case types.AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case types.UNAUTH_USER:
      return { ...state, authenticated: false };
    case types.AUTH_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
