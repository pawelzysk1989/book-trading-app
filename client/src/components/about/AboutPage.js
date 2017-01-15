import React from 'react';

// Since this component is simple and static, there's no parent container for it.
class AboutPage extends React.Component {
  render(){
    return (
      <div>
        <h2>About</h2>
        <p>
          About Page
        </p>
        <h2>Rules:</h2>
        <div>
          About Page
        </div>
        <h2>Development Stack:</h2>
        <div>
          - React, Redux, React-Router, Webpack <br/>
          - Node, Express, MongoDB <br/>
        </div>
      </div>
    );
  }
}

export default AboutPage;
