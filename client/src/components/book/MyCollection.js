import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import MyCollectionList from './MyCollectionList';
import RequestList from './RequestList';
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
    this.acceptRequest = this.acceptRequest.bind(this);
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

  cancelRequest(event, index, isMyRequests){
    event.preventDefault();
    var requests = isMyRequests ? this.props.myRequests : this.props.requestsToMe;
    const requestedBookId = requests[index].requestedBook._id;
    const bookToExchangeId = requests[index].offeredBook._id;
    this.props.actions.cancelRequest(requestedBookId, bookToExchangeId, index, isMyRequests) 
      .catch(error => {
        toastr.error(error.response.data.error);
      });
  }

  acceptRequest(event, index){
    event.preventDefault();
    var requests = this.props.requestsToMe;
    const requestedBook = requests[index].requestedBook;
    const bookToExchange = requests[index].offeredBook;
    this.props.actions.acceptRequest(requestedBook, bookToExchange)
      .catch(error => {
        toastr.error(error.response.data.error);
      });
  }

  render() {
    return (
      <div>
        {this.props.myRequests.length > 0 && <RequestList 
          requests={this.props.myRequests}
          cancelRequest={this.cancelRequest}
          isMyRequests={true}
        />}
        {this.props.requestsToMe.length > 0 && <RequestList 
          requests={this.props.requestsToMe}
          cancelRequest={this.cancelRequest}
          isMyRequests={false}
          acceptRequest={this.acceptRequest}
        />}
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
  requestsToMe: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.myBooks,
    myRequests: state.books.myRequests,
    requestsToMe: state.books.requestsToMe
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCollection);
