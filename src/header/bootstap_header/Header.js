import React from 'react';
import logo from './logo.png';
import './header.css';
import AlertDialogSlide from './LogInModule';
import {Row, Col, Container} from 'react-bootstrap';

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserLoggedIn />;
    }
    return <NotLogedIn />;
  }



function NotLogedIn(props) {
  return (
    <h2 className = 'align-bottom text-xl-right h2 font-weight-bold mr-4 mt-3'>
       <a href='#' className='d-inline'>
         SignUp
       </a> 
       <h2 className='ml-2 mr-2 d-inline font-weight-bold'>|</h2>
       <a href='#' className='d-inline'>
         LogIn
       </a>
    </h2>
  );
}



function UserLoggedIn(props) {
    return (
      <a className="a" href="/#">
        <h2 >My Account</h2>
      </a>
    );
  }


class Header extends React.Component{

      handleClick(e) {
        this.setState({
          justClicked: e.target.dataset.letter
        });
      }

render(){
    return(
      <Row sm={2} className='bg-header'>
        <Col className='align-middle'>
          <img src={logo} width={128} height={76} className='ml-2 mr-2' alt="logo"/>      
          <h2 className = 'd-inline align-middle text-xl-left h2 font-weight-bold'>
            <a href='#'>About Us</a>
          </h2>  
        </Col>
        <Col>
          <Greeting />
        </Col>
      </Row>
    );
    }
}


export default Header;