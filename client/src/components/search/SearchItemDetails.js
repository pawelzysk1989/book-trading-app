import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import SearchItemDetailsForm from './SearchItemDetailsForm';

export class SearchItemDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };

    if (!this.props.book ) {
      browserHistory.push('/search');
    }
  }

  render() {
    const book = this.props.book;
    return (
      <div className="row">
        <div className="col-md-9">
            <div className="list-group">
                <li className="list-group-item">
                  <div className="caption-full">
                    <h4 className="pull-right">{book.title}</h4>
                    <h4><a>Title</a></h4>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="caption-full">
                    <h4 className="pull-right">{book.authors.join(", ")}</h4>
                    <h4><a>{book.authors.length > 1 ? "Authors" : "Author"}</a></h4>
                  </div>
                </li>
                <li className="list-group-item" key="1">
                <div className="caption-full">
                  <h4 className="pull-right">{book.owner.email}</h4>
                  <h4><a>Owner email</a></h4>
                </div>
              </li>
              <li className="list-group-item" key="2">
                <div className="caption-full">
                  <h4 className="pull-right">{book.owner.city}</h4>
                  <h4><a>Owner City</a></h4>
                </div>
              </li>
              <li className="list-group-item" key="3">
                <div className="caption-full">
                  <h4 className="pull-right">{book.owner.state}</h4>
                  <h4><a>Owner State</a></h4>
                </div>
              </li>
            </div>
            <SearchItemDetailsForm reguestedBook={book._id}/>
        </div>
        <div className="col-md-3">
            <div className="thumbnail detail">
                <img className="img-responsive" src={book.imageLink}/>
            </div>
        </div>
      </div>
    );
  }
}

SearchItemDetails.propTypes = {
  book: PropTypes.object
};

function getBookById(books, id) {
  const book = books.filter(book => book._id == id);
  if (book) return book[0]; 
  return null;
}


function mapStateToProps(state, ownProps) {
  const bookId = ownProps.params.id;
  const books = state.search.books;
  let book = null;

  if (bookId && books.length > 0) {
    book = getBookById(books, bookId);
  }
  return {
    book
  };

}

export default connect(mapStateToProps, null)(SearchItemDetails);
