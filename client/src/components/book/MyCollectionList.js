import React, {PropTypes} from 'react';
import MyCollectionItem from './MyCollectionItem';
import { Link } from 'react-router';

const MyCollectionList = ({books, removeBook, selectedBook}) => {
  return (
    <div className="myCollectionList">
      <Link to="/addBook" className="btn btn-primary longButton">Add Book</Link>
      <Link to="/search" className="btn btn-primary longButton">Trade Book</Link>
      <h2 className="text-center">My books collection</h2>
      <div className="row text-center" style={{"display": "flex", "flexWrap": "wrap"}}>
      {books.map((book, i) =>
        <MyCollectionItem key={i} book={book} removeBook={removeBook} deleting={selectedBook==i} itemNr={i}/>
      )}
      </div>
    </div>
  );
};

MyCollectionList.propTypes = {
  books: PropTypes.array.isRequired,
  removeBook: PropTypes.func.isRequired,
  selectedBook: PropTypes.number
};

export default MyCollectionList;