import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import MyCollectionList from './MyCollectionList';
import MyRequestList from './MyRequestList';
import {bindActionCreators} from 'redux';
import * as bookActions from '../../actions/bookActions';
import toastr from 'toastr';

export class MyCollection extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedBook: -1
    };

    this.removeBook = this.removeBook.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }

  removeBook(id, selectedBook){
    this.setState({ selectedBook: selectedBook});
    this.props.actions.removeBook(id)
      .then(() => {
        this.setState({ selectedBook: -1});
        toastr.success('Book was deleted successfully');
      })
      .catch(error => {
        this.setState({ selectedBook: -1 });
        toastr.error(error.response.data.error);
      });
  }

  cancelRequest(event, index){
    event.preventDefault();
    const requestedBookId = this.props.myRequests[index].requestedBook._id;
    const bookToExchangeId = this.props.myRequests[index].offeredBook._id;
    this.props.actions.cancelBook(requestedBookId, bookToExchangeId, index) 
      .catch(error => {
        toastr.error(error.response.data.error);
      });
  }

  render() {
    return (
      <div>
        <MyRequestList 
          myRequests={this.props.myRequests}
          cancelRequest={this.cancelRequest}
        />
        <MyCollectionList
          books={this.props.books}
          selectedBook={this.state.selectedBook}
          removeBook={this.removeBook}
        />
      </div>
    );
  }
}

MyCollection.propTypes = {
  books: PropTypes.array.isRequired,
  myRequests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.myBooks,
    myRequests: state.books.myRequests
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCollection);
