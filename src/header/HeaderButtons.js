import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LogInMenu from './LoginMenu';
import './header.css';
import icon from './user-icon1.png';

import Modal from 'react-modal'
import {  Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './loginmenu.css';
import axios from 'axios'

import ReactDOM from 'react-dom';
import logo from "./logo.png";



function Greeting(props) {
  if (props.ifLoggedIn) {
    return <UserLoggedIn />;
  }
  return <NotLogedIn setToken={props.setToken}/>;
}


//Modal.setAppElement('#loginmodule')

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
    this.setState( {ifShowModal: false} );
    void console.log('ifShowModal is , disable clicked ', this.state.ifShowModal)
  }

  enableModal() {
    this.setState({ ifShowModal: true  });
    void console.log('ifShowModal is , enable clicked', this.state.ifShowModal)
  }

  render() {
    const style = {
        divAbsolute: {
            position: 'absolute',
            top: '0',
            right: '0',

        }
    }
    return (
      
      <div style={style.divAbsolute}>

        <div className="Div-Login" >
          <h2 onClick={this.enableModal}  >LogIn</h2>
          {
              <LogInMenu ifShowModal={this.state.ifShowModal} disableModal={this.disableModal}  setToken={this.props.setToken}/>
          }

        </div>
        <div className="Div-Login1" >
          <h2 >|</h2>
        </div>

        <div className="Div-Login" >
          <a className="a" href="/registration">
            <h2 >SignUp</h2>
          </a>
        </div>
      </div>
    );
  }
}

const style = {
    divAbsolute: {
        position: 'absolute',
        top: '0',
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