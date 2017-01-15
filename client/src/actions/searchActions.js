import * as types from '../constants/actionTypes';
import axios from 'axios';
import {SEARCH_LIMIT, ROOT_URL} from '../constants/variables';

function searchForBookSuccess(data){
  return { type: types.SEARCH_FOR_BOOK, payload: data};
}

export function searchForBook(searchCriteria, limit, offset) {
  return function (dispatch) {
    return axios.get(`${ROOT_URL}/searchForBook`, { headers: { authorization: localStorage.getItem('token'), criteria: JSON.stringify(searchCriteria), limit, offset} })
      .then(response => {
        dispatch(searchForBookSuccess(response.data));
      }).catch(error => {
        throw(error);
      });
  };
}

export function changeCriteriaAndSearch(searchCriteria) {
  return function (dispatch) {
    dispatch({ type: types.CHANGE_SEARCH_CRITERIA, payload: searchCriteria});
    dispatch(searchForBook(searchCriteria, SEARCH_LIMIT, 0));
  };
}










