const Book = require('../models/book');

exports.addBook = (req, res, next) => {
  const newBook = new Book(req.body.book);
  newBook.owner = req.user;

  Book.create(newBook)
    .then(book => {
      return res.json({ book });
    })
    .catch(next);
}

exports.getMyBooks = (req, res, next) => {
  const userId = req.user._id;

  Book.find({ "owner._id": userId})
    .populate('asRequestFor')
    .populate('inExchangeFor')
    .then( books => {
      return res.json({ books });
    })
    .catch(next);
}

exports.removeBook = (req, res, next) => {

  Book.findByIdAndRemove({ _id: req.body.id })
    .then(book => res.json({ id: book._id }))
    .catch(next);
}

exports.searchForBook = (req, res, next) => {
  const criteria = JSON.parse(req.headers.criteria);
  const limit = parseInt(req.headers.limit);
  const offset = parseInt(req.headers.offset);
  const userId = req.user._id;

  const query = Book.find(buildQuery(criteria, userId))
    .skip(offset)
    .limit(limit)
    
  return Promise.all([query, Book.find(buildQuery(criteria, userId)).count()])
    .then((results) => {
      res.json({ 
        books: results[0],
        count: results[1]
      });
    });
}

const buildQuery = (criteria, userId) => {
  const query = { "owner._id": { $ne: userId }};

  if (criteria.search) {
    query.$text = { $search: criteria.search };
  }
  return query;
};

exports.requestForBook = (req, res, next) => {
  const requestedBookId = req.body.requestedBookId;
  const bookToExchangeId = req.body.bookToExchangeId;
  return Promise.all([findBookByIdAndUpdateSet(requestedBookId, bookToExchangeId, "asRequestFor", "$addToSet"), findBookByIdAndUpdateSet(bookToExchangeId, requestedBookId, "inExchangeFor", "$addToSet")])
    .then(() => {
      return Promise.all([findBookById(requestedBookId), findBookById(bookToExchangeId)])
    })
    .then((books) => {
      res.json({ 
        requestedBook: books[0],
        offeredBook: books[1]
      });
    })
    .catch(next)
}


const findBookByIdAndUpdateSet = (regestedBookId, exchangeBookId, field, action) => {
  return Book.findByIdAndUpdate(
    regestedBookId,
      { 
        [action]: {[field]: exchangeBookId}
      }
    )
}

exports.cancelRequest = (req, res, next) => {

  const requestedBookId = req.body.requestedBookId;
  const bookToExchangeId = req.body.bookToExchangeId;
  return Promise.all([findBookByIdAndUpdateSet(requestedBookId, bookToExchangeId, "asRequestFor", "$pull"), findBookByIdAndUpdateSet(bookToExchangeId, requestedBookId, "inExchangeFor", "$pull")])
    .then(() => {
      return Promise.all([findBookById(requestedBookId), findBookById(bookToExchangeId)])
    })
    .then((books) => {
      res.json({ 
        requestedBook: books[0],
        offeredBook: books[1]
      });
    })
    .catch(next)
}


exports.acceptRequest = (req, res, next) => {

  const requestedBookId = req.body.requestedBookId;
  const bookToExchangeId = req.body.bookToExchangeId;

  Promise.all([findOwner(requestedBookId), findOwner(bookToExchangeId)])
    .then((owners) => {
      Promise.all([changeOwner(requestedBookId, owners[1]), changeOwner(bookToExchangeId, owners[0])])
    })
    .then(() => {
      return Promise.all([findBookById(requestedBookId), findBookById(bookToExchangeId)])
    })
    .then((books) => {
      res.json({ 
        requestedBook: books[0],
        exchengedBook: books[1]
      });
    })
    .catch(next)
}


const findOwner = (bookId) => {
  return Book.findById(bookId)
    .then( book => book.owner)
}

const changeOwner = (bookId, owner) => {
  return Book.findByIdAndUpdate(bookId, {owner});
}

const findBookById = (bookId) => {
  return Book.findById(bookId)
}



