import React, {PropTypes} from 'react';
import AddBookForm from './AddBookForm';
import AddBookList from './AddBookList';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bookActions from '../../actions/bookActions';
import toastr from 'toastr';

export class AddBook extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: "",
      searchText: "",
      book: {},
      books: [],
      chosenBook: -1,
      searching: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  onInputChange(event) {
    return this.setState({searchText: event.target.value});
  }

  isFormValid(){
    if(this.state.searchText.length === 0){
      this.setState({error: "Type the book title"});
    }
    return this.state.searchText.length > 0;
  }

  onSearch(event) {
    event.preventDefault();

    const searchText = this.state.searchText;
    const requestedUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`;
    
    if(!this.isFormValid()){
      return;
    }
    this.setState({ searching: true, error: "" });
    axios.get(`${requestedUrl}`)
    .then(response => {
      const allBooks = response.data.items || [];
      const books = allBooks.reduce((memo, book) => {
        if(book.volumeInfo.imageLinks){
          memo.push({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            imageLink: book.volumeInfo.imageLinks.thumbnail
          });
        }
        return memo;
      }, []);

      this.setState({books: books, searching: false});
    })
    .catch((error) => {
      this.setState({ searching: false,  error: error.message});
    });
  }

  addBook(book, bookNr){
    this.setState({ chosenBook: bookNr});
    this.props.actions.addBook(book)
      .then(() => {
        this.setState({ chosenBook: -1 });
        toastr.success('Book successfully added to your collection');
      })
      .catch(error => {
        this.setState({ chosenBook: -1 });
        toastr.error(error.response.data.error);
      });
  }

  render() {
    return (
      <div className="addBook">
        <AddBookForm
          searchText={this.state.searchText}
          onChange={this.onInputChange}
          onSearch={this.onSearch}
          searching={this.state.searching}
          error={this.state.error}
        />
        <AddBookList
          books={this.state.books}
          addBook={this.addBook}
          chosenBook={this.state.chosenBook}
        />
      </div>
    );
  }
}

AddBook.propTypes = {
  actions: PropTypes.object.isRequired
};



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AddBook);

