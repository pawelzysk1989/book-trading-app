import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as settingsActions from '../../actions/settingsActions';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

class Settings extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      savingChanges: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount(){
    this.props.actions.getSettings();

  }

  handleFormSubmit(formProps) {
    this.setState({ savingChanges: true });
    this.props.actions.saveSettings(formProps)
      .then(() => {
        this.setState({ savingChanges: false });
        toastr.success("Changes saved");
      })
      .catch(error => {
        this.setState({ savingChanges: false });
        toastr.error(error.response.data.error);
      });
  }

  render() {
    const { handleSubmit, fields: { email, city, state, password}} = this.props;
    const savingChanges = this.state.savingChanges;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>City:</label>
          <input className="form-control" {...city} type="city" />
          {city.touched && city.error && <div className="error">{city.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>State:</label>
          <input className="form-control" {...state} type="state" />
          {state.touched && state.error && <div className="error">{state.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <input 
          type="submit"
          disabled={savingChanges}
          value={savingChanges ? 'Saving...' : 'Save Changes'}
          className="btn btn-primary btn-md"/>
      </form>
    );
  }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(formProps) {
  const errors = {};

  if (!validateEmail(formProps.email)) {
    errors.email = 'Please enter a correct email';
  }

  if (!formProps.city) {
    errors.city = 'Please enter a city';
  }

  if (!formProps.state) {
    errors.state = 'Please enter a state';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(settingsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return { 
    initialValues: state.settings 
  };
}

export default reduxForm({
  form: 'settingsData',
  fields: ['email', 'city', 'state', 'password'],
  validate
}, mapStateToProps, mapDispatchToProps)(Settings);
