import React, {PropTypes} from 'react';
import AddBookItem from './AddBookItem';

const AddBookList = ({books, addBook, chosenBook}) => {
  return (
    <div>
      <div className="row text-center" style={{"display": "flex", "flexWrap": "wrap"}}>
      {books.map((book, i) =>
        <AddBookItem key={i} book={book} addBook={addBook} adding={chosenBook==i} itemNr={i}/>
      )}
      </div>
    </div>
  );
};

AddBookList.propTypes = {
  books: PropTypes.array.isRequired,
  addBook: PropTypes.func.isRequired,
  chosenBook: PropTypes.number
};

export default AddBookList;