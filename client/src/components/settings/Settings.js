import React, { Component} from 'react';
import ChangeDataForm from './ChangeDataForm';
import ChangePasswordForm from './ChangePasswordForm';

class Settings extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {  
    };
  }

  render() {

    return (
      <div>
        <ChangeDataForm/>
        <ChangePasswordForm/>
      </div>
    );
  }
}

export default Settings;
