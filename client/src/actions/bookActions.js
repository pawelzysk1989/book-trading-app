import * as types from '../constants/actionTypes';
import axios from 'axios';
import { ROOT_URL } from '../constants/variables';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function addBookSuccess(book) {
  return { type: types.ADD_BOOK_SUCCESS, payload: book };
}

export function removeSuccess(id) {
  return { type: types.REMOVE_BOOK_SUCCESS, payload: id };
}

export function loadMyBooksSuccess(books) {
  return { type: types.LOAD_MY_BOOKS_SUCCESS, payload: books};
}

export function unloadMyBooks() {
  return { type: types.UNLOAD_MY_BOOKS};
}

export function requestBookSuccess(requestedBook, exchengedBook) {
  return { type: types.REQUEST_BOOK_SUCCESS, payload: {requestedBook, exchengedBook}};
}

export function addBook(book) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/addBook`, { book }, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(addBookSuccess(response.data.book));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function loadMyBooks() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(`${ROOT_URL}/getMyBooks`, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(loadMyBooksSuccess(response.data.books));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function removeBook(id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/removeBook`, { id }, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(removeSuccess(response.data.id));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function requestBook(requestedBookId, bookToExchangeId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/requestForBook`, { requestedBookId,  bookToExchangeId}, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(requestBookSuccess(response.data.requestedBook, response.data.exchengedBook));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}










