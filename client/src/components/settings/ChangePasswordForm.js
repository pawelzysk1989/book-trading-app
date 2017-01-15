import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as settingsActions from '../../actions/settingsActions';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

class ChangePasswordForm extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      savingChanges: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.setState({ savingChanges: true });
    this.props.actions.changePassword(formProps)
      .then(() => {
        this.setState({ savingChanges: false });
        toastr.success("Password changed");
      })
      .catch(error => {
        this.setState({ savingChanges: false });
        toastr.error(error.response.data.error);
      });
  }

  render() {
    const { handleSubmit, fields: { newPassword, passwordConfirm, password}} = this.props;
    const savingChanges = this.state.savingChanges;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        
        <fieldset className="form-group">
          <label>New password:</label>
          <input className="form-control" {...newPassword} type="password" />
          {newPassword.touched && newPassword.error && <div className="error">{newPassword.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Current password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <input 
          type="submit"
          disabled={savingChanges}
          value={savingChanges ? 'Saving...' : 'Change Password'}
          className="btn btn-primary btn-md"/>
      </form>
    );
  }
}



function validate(formProps) {
  const errors = {};

  if (!formProps.newPassword) {
    errors.newPassword = 'Please enter a password';
  }

  if (formProps.newPassword !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

ChangePasswordForm.propTypes = {
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(settingsActions, dispatch)
  };
}

export default reduxForm({
  form: 'settingsPassword',
  fields: ['newPassword', 'passwordConfirm', 'password'],
  validate
}, null, mapDispatchToProps)(ChangePasswordForm);
