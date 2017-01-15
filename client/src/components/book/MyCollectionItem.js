import React, {PropTypes} from 'react';

const MyCollectionItem = ({book, removeBook, deleting, itemNr}) => {
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
          disabled={deleting}
          value={deleting ? 'Removing...' : 'Remove'}
          onClick={() => removeBook(book._id, itemNr)}
          className="btn btn-danger"/>
      </div>
    </div>
  );
};

MyCollectionItem.propTypes = {
  book: PropTypes.object.isRequired,
  removeBook: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
  itemNr: PropTypes.number
};

export default MyCollectionItem;
