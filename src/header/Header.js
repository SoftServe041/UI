import React, { useState} from 'react';

import PropTypes from 'prop-types'


import logo from './logo.png';
import './header.css';
import MContext from './Context'

import LogInMenu from './LoginMenu'



//Checking if user is logged in -> show correspondent menu

function Greeting() {
    const isLoggedIn = false;
    if (isLoggedIn) {
      return <UserLoggedIn />;
    }
    return <NotLogedIn />;
  }



function NotLogedIn(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalOpened = e => { 
    e.preventDefault();
    setModalIsOpen(true);
  
  };
  // <LogInMenu modalIsOpen={modalIsOpen} handler1={() => this.props.handler1}/>
  //onClick={()=> {this.props.handler2} } closeModal={() => {this.props.handler1}  
  //this.state.messageShown
  return (
    <div>

    <div className="Div-Login"  onClick={modalOpened } > 
      <h2  >LogIn</h2>
      {console.log(modalIsOpen, ' hello from header js')}
      
      <LogInMenu modalIsOpen={modalIsOpen} />
      
      
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



/////////////////////////////onclick does not work -> testing

/*
const modalIsOpen = true;
class NotLogedIn extends React.Component {
  constructor(params){
    super(params);

    //this.modalIsOpen = true;
    
  }



  
  render(){

      return (
    <div>

    <div className="Div-Login" onClick={ () => {this.modalIsOpen = true}}  > 
      <h2 onClick={() => {this.modalIsOpen = true} } >LogIn</h2>
      <LogInMenu modalIsOpen={modalIsOpen}/>
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
  );}
}
*/

////////////////////////////////////////


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

/*
    this.Greeting = this.Greeting.bind(this);
    this.NotLogedIn = this.NotLogedIn.bind(this);
    this.UserLoggedIn = this.UserLoggedIn(this);
    */
    this.handler1 = this.handler1.bind(this);
    this.handler2 = this.handler2.bind(this);
    this.state = {
        messageShown: false
    };
  }

  
 handler1() {
  this.setState({
      messageShown: false
  });
}

handler2() {
  this.setState({
      messageShown: true
  });
}

/*
Greeting() {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return (<div> {() => this.UserLoggedIn } </div>);
  }
  return (<div> {() => this.NotLogedIn } </div>);
}

NotLogedIn() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalOpened = e => { 
    e.preventDefault();
    setModalIsOpen(true);
  
  };
  // <LogInMenu modalIsOpen={modalIsOpen} handler1={() => this.props.handler1}/>
  //onClick={()=> {this.props.handler2} } closeModal={() => {this.props.handler1}  
  //this.state.messageShown
  return (
    <div>

    <div className="Div-Login"   > 
      <h2  >LogIn</h2>
      {console.log(modalIsOpen, ' hello from header js')}
      
      <LogInMenu modalIsOpen={modalIsOpen} />
      
      
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


UserLoggedIn() {
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



Header.propTypes = {
  modalIsOpen: PropTypes.bool

}

export default Header;