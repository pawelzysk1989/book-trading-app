import * as types from '../constants/actionTypes';
import axios from 'axios';
import { loadMyBooks,  unloadMyBooks} from './bookActions';
import { ROOT_URL } from '../constants/variables';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server

    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(authUser());
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        dispatch(loadMyBooks());
      })
      .then(() => {
        // - Load books owned by authenticated user and ridirect user to his page
        dispatch(loadMyBooks());
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
        throw(error);
      });
  };
}

export function signupUser(user) {
  return function(dispatch) {
    // Submit email/password to the server

    return axios.post(`${ROOT_URL}/signup`, { user })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(authUser());
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        // If request is bad...
        // - Throw an error and atch it in Signup component
        throw(error);
      });
  };
}


export function signoutUser() {
  localStorage.removeItem("token");
  return function(dispatch) {
    dispatch({ type: types.UNAUTH_USER });
    dispatch(unloadMyBooks());
  };
}

export function authUser() {
  return {
    type: types.AUTH_USER,
  };
}


export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}



