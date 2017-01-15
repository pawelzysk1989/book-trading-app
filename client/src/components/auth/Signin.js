import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as authActions from '../../actions/authActions';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class Signin extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      signingIn: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit({ email, password }) {
    this.setState({ signingIn: true });
    this.props.authActions.signinUser({ email, password })
      .then(() => {
        this.setState({ signingIn: false });
        browserHistory.push('/myCollection');
        toastr.success('Welcome my friend!');
      })
      .catch(() => {
        this.setState({ signingIn: false });
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
    const { handleSubmit, fields: { email, password }} = this.props;
    const signingIn = this.state.signingIn;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <input 
          type="submit"
          disabled={signingIn}
          value={signingIn ? 'Signing in...' : 'Sign in'}
          className="btn btn-primary btn-md"/> 
      </form>
    );
  }
}

Signin.propTypes = {
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
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, mapDispatchToProps)(Signin);