import React from 'react';
import logo from './logo.png';
import './header.css';



function Header(props) {
  return (
    <div className="Div-Absolute">
      <header className="Main-header">
        
        <a href="/">
          <div className="Div-image">
            <img src={logo} className="Logo" alt="logo" />
          </div>
        </a>

        <div className="Div-Menu" id="TopNav">
          <a className="a" href="/about-our-company">
            <h4 >About Us</h4>
          </a>
        </div>
      </header>
    </div>
  );
}


export default Header;

