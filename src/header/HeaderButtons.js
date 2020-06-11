import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LogInMenu from './LoginMenu';
import './header.css';
import icon from './user-icon1.png';


import './loginmenu.css';



function Greeting(props) {
  if (props.ifLoggedIn) {
    return <UserLoggedIn />;
  }
  return <NotLogedIn handleToken={props.handleToken} />;
}




class NotLogedIn extends React.Component {
  constructor(props) {
    super(props);
    this.disableModal = this.disableModal.bind(this);
    this.enableModal = this.enableModal.bind(this);
    this.state = {
      ifShowModal: false,
    };
  }


  disableModal() {
    this.setState({ ifShowModal: false });
    void console.log('ifShowModal is , disable clicked ', this.state.ifShowModal)
  }

  enableModal() {
    this.setState({ ifShowModal: true });
    void console.log('ifShowModal is , enable clicked', this.state.ifShowModal)
  }

  render() {
    const style = {
      divAbsolute: {
        position: 'absolute',
        top: '0',
        right: '0',
        paddingTop: '15px',

      }
    }
    return (

      <div style={style.divAbsolute}>

        <div className="Div-Login" >
          <h4 onClick={this.enableModal} className="h4" >LogIn</h4>
          {
            <LogInMenu ifShowModal={this.state.ifShowModal}
              disableModal={this.disableModal}
              handleToken={this.props.handleToken} />
          }

        </div>
        <div className="Div-Login1" >
          <h4 >|</h4>
        </div>

        <div className="Div-Login" >
          <a className="a" href="/registration">
            <h4 >SignUp</h4>
          </a>
        </div>
      </div>
    );
  }
}

const style = {
  divAbsolute: {
    position: 'absolute',
    top: '5px',
    right: '0',

  }
}


function UserLoggedIn(props) {
  return (
    <div style={style.divAbsolute}>

      <div className="Div-Login" >
        <a className="a" href="/account">
          <img src={icon} className="User" alt="icon" />

        </a>
      </div>

    </div>
  );
}




NotLogedIn.propTypes = {
  ifShowModal: PropTypes.bool

}

export default Greeting;

//ReactDOM.render(<Modal />, document.getElementById('loginmodule') )