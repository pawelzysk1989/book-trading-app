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
		case types.REQUEST_BOOK_SUCCESS: {
			const requestedBook = action.payload.requestedBook;
			const exchengedBook = action.payload.exchengedBook;
			for (let i = 0; i < state.myRequests.length; i++) {
				if(state.myRequests[i].requestedBook._id == requestedBook._id && state.myRequests[i].exchengedBook._id == exchengedBook._id){
					return state;
				}
			}
			return {...state, myRequests: [...state.myRequests, { requestedBook, exchengedBook }] };
		}
	}
	
  return state;
}