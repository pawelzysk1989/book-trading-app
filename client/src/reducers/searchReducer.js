import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.search, action) {
	switch(action.type) {
		case types.SEARCH_FOR_BOOK: {
			return {...state, books: state.books.concat(action.payload.books), count: action.payload.count};
		}
		case types.CHANGE_SEARCH_CRITERIA: {
			return {...state, books: [], criteria: action.payload};
		}
	}
	
  return state;
}