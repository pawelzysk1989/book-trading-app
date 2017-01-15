import React, {PropTypes} from 'react';

const AddBookItem = ({book, addBook, adding, itemNr}) => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="thumbnail">
         <img className="img-responsive" src={book.imageLink}/>
         <div className="caption">
             <h4>{book.title}</h4>
         </div>
         <div className="caption">
             <h4>{book.authors.join(", ")}</h4>
         </div>
         <input 
          type="submit"
          disabled={adding}
          value={adding ? 'Adding...' : 'Add to Collection'}
          onClick={() => addBook(book, itemNr)}
          className="btn btn-primary btn-md"/>
      </div>
    </div>
  );
};

AddBookItem.propTypes = {
  book: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired,
  adding: PropTypes.bool.isRequired,
  itemNr: PropTypes.number.isRequired
};

export default AddBookItem;
