import React from 'react';
import logo from './logo.png';
import './header.css';
//import LoginForm from "./LogInModule";
import AlertDialogSlide from './LogInModule';

//Checking if user is logged in -> show correspondent menu

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserLoggedIn />;
    }
    return <NotLogedIn />;
  }



function NotLogedIn(props) {
  return (
    <div>
      
    <div className="Div-Login" > 
      <h2 >LogIn</h2>
    </div>

    <div className="Div-Login" >

      <h2 >|</h2>

    </div>

    <div className="Div-Login" >
    <a className="a" href="/#">
      <h2 >SignUp</h2>
    </a>
    </div>

</div>
  );
}



function UserLoggedIn(props) {
    return (
      <div>
        
      <div className="Div-Login" >
      <a className="a" href="/#">
        <h2 >My Account</h2>
      </a>
      </div>
  
  </div>
    );
  }

//End: Checking if user is logged in -> show correspondent menu

////////////////////////////////////////////////////////////

  

//Login Menu when click

// End





class Header extends React.Component{

      handleClick(e) {
        this.setState({
          justClicked: e.target.dataset.letter
        });
      }

render(){
    return(
        <div className="Div-Absolute">
        <header className="Main-header">
          <div className="Div-image">
            <a href="/">
          <img src={logo} className="Logo" alt="logo"  />
          </a>
          </div>
        
          <div className="Div-Menu" id="TopNav">
            <a className="a" href="/#">
            <h2 >About Us</h2>
          </a>
          </div>
           
           <Greeting />
           
          
          </header>
      </div>
    );
    }
}


export default Header;