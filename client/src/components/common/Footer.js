import React from 'react';
import { Link } from 'react-router';


class Footer extends React.Component {

  render() {
    return (
      <nav className="footer navbar navbar-default">
        <div className="text-center center-block">
            <br />
              <Link to="https://github.com/pawelzysk1989" target="_blank"><i id="social-github" className="fa fa-github-square fa-2x social"></i></Link>
              <Link to="https://www.freecodecamp.com/pawelzysk1989" target="_blank"><i id="social-freeCodeCamp" className="fa fa-free-code-camp fa-2x social"></i></Link>
              <Link to="https://www.linkedin.com/in/pawe%C5%82-zy%C5%9Bk-424122101" target="_blank"><i id="social-linkedin" className="fa fa-linkedin-square fa-2x social"></i></Link>
        </div>
     </nav>
    );
  }
}


export default Footer;
