import React from 'react';
import PropTypes from 'prop-types';

import LogInMenu from './LoginMenu';
import logo from './logo.png';
import './header.css';


function Header(props) {
  return (
    <div className="Div-Absolute">
      <header className="Main-header">
        <div className="Div-image">
          <a href="/">
            <img src={logo} className="Logo" alt="logo" />
          </a>
        </div>

        <div className="Div-Menu" id="TopNav">
          <a className="a" href="#">
            <h2 >About Us</h2>
          </a>
        </div>
        <Greeting ifLoggedIn={props.ifLoggedIn} />
      </header>
    </div>
  );
}




function Greeting(props) {
  if (props.ifLoggedIn) {
    return <UserLoggedIn />;
  }
  return <NotLogedIn />;
}






class NotLogedIn extends React.Component {
  constructor(props) {
    super(props);
    this.disableModal = this.disableModal.bind(this);
    this.enableModal = this.enableModal.bind(this);
    this.state = {
      ifShowModal: false
    };
  }

  disableModal() {
    this.setState( {ifShowModal: false} );
    {console.log('clicked  function and here is the result',this.state.ifShowModal, this.disableModal )}
  }

  enableModal() {
    this.setState({
      ifShowModal: true
    });
  }

  render() {
    return (
      <div>

        <div className="Div-Login" onClick={this.enableModal} >
          <h2  >LogIn</h2>
          <LogInMenu ifShowModal={this.state.ifShowModal} disableModal={this.disableModal} />


        </div>
        <div className="Div-Login1" >
          <h2 >|</h2>
        </div>

        <div className="Div-Login" >
          <a className="a" href="#">
            <h2 >SignUp</h2>
          </a>
        </div>
      </div>
    );
  }
}




function UserLoggedIn(props) {
  return (
    <div>

      <div className="Div-Login" >
        <a className="a" href="#">
          <h2 >My Account</h2>
        </a>
      </div>

    </div>
  );
}




NotLogedIn.propTypes = {
  ifShowModal: PropTypes.bool

}


export default Header;