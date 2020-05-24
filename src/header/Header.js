import React, { useState} from 'react';

import PropTypes from 'prop-types'
import Modal from 'react-modal'

import logo from './logo.png';
import './header.css';
import Context from './Context'
import App from '../App';
import LogInMenu from './LoginMenu'



//Checking if user is logged in -> show correspondent menu

function Greeting() {
    const isLoggedIn = false;
    if (isLoggedIn) {
      return <UserLoggedIn />;
    }
    return <NotLogedIn />;
  }



function NotLogedIn() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div>

    <div className="Div-Login" onClick={ () => setModalIsOpen(false) }> 
    <a className="a" href="/#">
      <h2 >LogIn</h2>
      <LogInMenu modalIsOpen={true}/>
      </a>
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

//End: Checking if user is logged in -> show correspondent menu

////////////////////////////////////////////////////////////

  

//Login Menu when click




/*
function LoginClicked(){
  const [ifLoginClicked, setIfLoginClicked] =  useState(false);
return (
/*<Context.Provider value={{ifLoginClicked}} >
    
  setIfLoginClicked(!ifLoginClicked)
   
</Context.Provider>);

ifLoginClicked
);
}
*/



class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  handleClick() {
    this.ifLoginClicked2 = true;
    console.log(this.ifLoginClicked2)
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  /*
      handleClick(e) {
        this.setState({
          justClicked: e.target.dataset.letter
        });
      }
      */

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
            <a className="a" href="#">
            <h2 >About Us</h2>
          </a>
          </div>
           
           <Greeting />
           

          </header>
      </div>
    );
    }





}



NotLogedIn.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired

}

export default Header;