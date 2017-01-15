import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as authActions from '../../actions/authActions';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class Signup extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      signingUp: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.setState({ signingUp: true });
    this.props.authActions.signupUser(formProps)
      .then(() =>{
        this.setState({ signingUp: false });
        browserHistory.push('/');
        toastr.success('Welcome my friend!');
      })
      .catch(error => {
        this.setState({ signingUp: false });
        toastr.error(error.response.data.error);
      });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, city, state, password, passwordConfirm }} = this.props;
    const signingUp = this.state.signingUp;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>City:</label>
          <input className="form-control" {...city} />
          {city.touched && city.error && <div className="error">{city.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>State:</label>
          <input className="form-control" {...state} />
          {state.touched && state.error && <div className="error">{state.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <input 
          type="submit"
          disabled={signingUp}
          value={signingUp ? 'Signing up...' : 'Sign up'}
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

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.city) {
    errors.city = 'Please enter a city';
  }

  if (!formProps.state) {
    errors.state = 'Please enter a state';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  authActions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch){
  return{
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'city', 'state', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, mapDispatchToProps)(Signup);
