import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.myBooks, action) {
	switch(action.type) {
		case types.ADD_BOOK_SUCCESS: {
			return {...state, myBooks: [...state.myBooks, action.payload]};
		}
		case types.LOAD_MY_BOOKS_SUCCESS: {
			const myBooks = action.payload;
			const requests = parseRequests(myBooks);
			const myRequests = requests.myRequests;
			const requestsToMe = requests.readersRequests;
			return {...state, myBooks, myRequests, requestsToMe};
		}
		case types.UNLOAD_MY_BOOKS: {
			return initialState.myBooks;
		}
		case types.REMOVE_BOOK_SUCCESS: {
			const removedBookId = action.payload;
			const myRequests = removeRequests(removedBookId, state.myRequests, false);
			const requestsToMe = removeRequests(removedBookId, state.requestsToMe, true);
			return {...state, myBooks: state.myBooks.filter( book => book._id !== removedBookId ), myRequests, requestsToMe};
		}
		case types.REQUEST_BOOK_SUCCESS: {
			const requestedBook = action.payload.requestedBook;
			const offeredBook = action.payload.offeredBook;
			for (let i = 0; i < state.myRequests.length; i++) {
				if(state.myRequests[i].requestedBook._id == requestedBook._id && state.myRequests[i].offeredBook._id == offeredBook._id){
					return state;
				}
			}
			return {...state, myRequests: [...state.myRequests, { requestedBook, offeredBook }] };
		}
		case types.CANCEL_BOOK_SUCCESS: {
			const indexToRemove = action.payload.index;
			const isMyRequests = action.payload.isMyRequests;
			const requestsName = isMyRequests ? "myRequests" : "requestsToMe";
			const requests = state[requestsName].filter( (request, index) => index !== indexToRemove );
			return {...state, [requestsName]: requests };
		}

	}
	
  return state;
}

const removeRequests = (removedBookId, requests, isRequestToMe) => {
	const consideredField = isRequestToMe ? "requestedBook" : "offeredBook";
	return requests.filter( request => {
		return request[consideredField]._id !== removedBookId;
	});
};

const parseRequests = (books) => {
	const myRequests = [];
	const readersRequests = [];

	books.forEach((book) => {
		book.inExchangeFor.forEach(requestedBook => {
			myRequests.push({requestedBook, offeredBook: book});
		});
		book.asRequestFor.forEach(offeredBook => {
			readersRequests.push({requestedBook: book, offeredBook});
		});
	});
	return {myRequests, readersRequests};
};
