import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import toastr from 'toastr';


class Signout extends React.Component {
  
  constructor(props, context){
    super(props, context);
    this.state = {

    };

  }

  componentWillMount(){
    this.props.authActions.signoutUser();
  }


  render(){
    return(
      <div>I hope to see you soon :)</div>
    );
  }
}



function mapDispatchToProps(dispatch){
  return{
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Signout);

