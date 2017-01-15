import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const SearchItem = ({book}) => {
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
         <Link to={"/book/" + book._id} className="btn btn-primary">More Details</Link>
      </div>
    </div>
  );
};

SearchItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default SearchItem;
