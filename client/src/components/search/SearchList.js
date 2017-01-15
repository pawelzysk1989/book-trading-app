import React, {PropTypes} from 'react';
import SearchItem from './SearchItem';

const SearchList = ({books}) => {
  return (
    <div className="searchList">
      <div className="row text-center" style={{"display": "flex", "flexWrap": "wrap"}}>
      {books.map((book, i) =>
        <SearchItem key={i} book={book}/>
      )}
      </div>
    </div>
  );
};

SearchList.propTypes = {
  books: PropTypes.array.isRequired
};

export default SearchList;