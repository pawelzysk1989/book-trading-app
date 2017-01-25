import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.myBooks, action) {
	switch(action.type) {
		case types.ADD_BOOK_SUCCESS: {
			return {...state, myBooks: [...state.myBooks, action.payload]};
		}
		case types.LOAD_MY_BOOKS_SUCCESS: {
			return {...state, myBooks: [...action.payload]};
		}
		case types.UNLOAD_MY_BOOKS: {
			return initialState.myBooks;
		}
		case types.REMOVE_BOOK_SUCCESS: {
			return {...state, myBooks: state.myBooks.filter( book => book._id !== action.payload )};
		}
	}
	
  return state;
}