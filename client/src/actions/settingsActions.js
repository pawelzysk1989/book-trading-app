import * as types from '../constants/actionTypes';
import axios from 'axios';
import { ROOT_URL } from '../constants/variables';

function getSettingsSuccess(data){
  return { type: types.GET_SETTINGS, payload: data};
}

function saveSettingsSuccess(data){ 
  return { type: types.SAVE_SETTINGS, payload: data };
}

function changePasswordSuccess(){ 
  return { type: types.CHANGE_PASSWORD};
}

export function getSettings() {
  return function (dispatch) {
    return axios.get(`${ROOT_URL}/getSettings`, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(getSettingsSuccess(response.data.user));
      }).catch(error => {
        throw(error);
      });
  };
}

export function saveSettings(settings) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/saveSettings`, settings, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(saveSettingsSuccess(response.data.user));
      }).catch(error => {
        throw(error);
      });
  };
}

export function changePassword(passwords) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/changePassword`, passwords, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => {
        dispatch(changePasswordSuccess());
      }).catch(error => {
        throw(error);
      });
  };
}












