import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import * as bookActions from '../../actions/bookActions';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

export class SearchItemDetailsForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      requesting: false
    };

  }

  handleFormSubmit(formProps) {
    if(!formProps.book){
      return toastr.error('Select a book');
    }
    this.setState({ requesting: true });
    this.props.actions.requestBook(this.props.reguestedBook, formProps.book)
      .then( () => {
        this.setState({ requesting: false });
      })
      .catch( () => {
        this.setState({ requesting: false });
      });
  }

  render() {
    const books = this.props.books;
    const { handleSubmit, fields: { book }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="bookExchange">Exchange for:</label>
          <div className="field">
            <select {...book} className="form-control" >
              <option value=""/>
              {books.map(book => <option key={book._id} value={book._id}>{book.title}</option>)}
            </select>
          </div>
        </fieldset>
        <input 
          type="submit"
          disabled={this.state.requesting}
          value={this.state.requesting ? "Requesting..." : "Request"}
          className="btn btn-primary btn-md longButton"/>
      </form>
    );
  }
}

SearchItemDetailsForm.propTypes = {
  books: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  reguestedBook: PropTypes.string.isRequired
};


function mapStateToProps(state) {
  return { books: state.books.myBooks };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default reduxForm({
  form: 'tradeBook',
  fields: ['book']
}, mapStateToProps, mapDispatchToProps)(SearchItemDetailsForm);