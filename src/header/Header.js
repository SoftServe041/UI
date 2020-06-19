import React from 'react';
import logo from './logo.png';
import './header.css';
import {Link, Route} from 'react-router-dom';



function Header(props) {

  /*
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  */
  

  return (
    <div className="Div-Absolute">
      <header className="Main-header">


        <Link to="/" >
          <div className="Div-image">
            <img src={logo} className="Logo" alt="logo" />
          </div>
        </Link>

        <div className="Div-Menu" id="TopNav">
          <Link className="a" to="/about-our-company">
            <h4 >About Us</h4>
          </Link>
        </div>
      </header>
    </div>
  );
}


export default Header;

