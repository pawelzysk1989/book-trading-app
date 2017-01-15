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

  Book.find({ owner: userId})
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

