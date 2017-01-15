import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {routerReducer} from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import search from './searchReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  form,
  auth: authReducer,
  books: bookReducer,
  search,
  settings,
  routing: routerReducer
});

export default rootReducer;

