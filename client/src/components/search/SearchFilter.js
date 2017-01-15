import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as searchActions from '../../actions/searchActions';
import {bindActionCreators} from 'redux';

class SearchFilter extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.actions.changeCriteriaAndSearch(formProps);
  }

  render() {
    const { handleSubmit, fields: { search }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Search:</label>
          <input className="form-control" {...search} />
        </fieldset>
        <input 
          type="submit"
          value="Search"
          className="btn btn-primary btn-md longButton"/>
      </form>
    );
  }
}

SearchFilter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  };
}

export default reduxForm({
  form: 'bookFilter',
  fields: ['search'],
  initialValues: { search: '' }
}, null, mapDispatchToProps)(SearchFilter);