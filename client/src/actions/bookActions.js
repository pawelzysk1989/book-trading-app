import * as types from '../constants/actionTypes';
import axios from 'axios';
import { ROOT_URL } from '../constants/variables';

export function addBookSuccess(book) {
  return { type: types.ADD_BOOK, payload: book };
}

export function removeSuccess(id) {
  return { type: types.REMOVE_BOOK, payload: id };
}

export function loadMyBooksSuccess(books) {
  return { type: types.LOAD_MY_BOOKS, payload: books};
}

export function unloadMyBooks() {
  return { type: types.UNLOAD_MY_BOOKS};
}

export function addBook(book) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/addBook`, { book }, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(addBookSuccess(response.data.book));
      }).catch(error => {
        throw(error);
      });
  };
}

export function loadMyBooks() {
  return function (dispatch) {
    return axios.get(`${ROOT_URL}/getMyBooks`, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(loadMyBooksSuccess(response.data.books));
      }).catch(error => {
        throw(error);
      });
  };
}

export function removeBook(id) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/removeBook`, { id }, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(removeSuccess(response.data.id));
      }).catch(error => {
        throw(error);
      });
  };
}











