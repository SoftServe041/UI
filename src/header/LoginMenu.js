import React, { useState} from 'react';
import Modal from 'react-modal'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './loginmenu.css';

import axios from 'axios'

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val < 3 && (valid = false);
    } );

    return valid;
}

const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

class LogInMenu extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.modalIsOpen);
        
        //const modalsOpen = props.modalsOpen;
        this.state = {
            email: '', 
            password: '',
            
            formErrors:{
                email: "",
                password : ""
            }
    }
                
    }


     handleChange = (e) => {
        //this.setState({[e.target.name]: e.target.value})
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name) {
            case 'email':
                formErrors.email = 
                emailRegex.test(value)
                ? ''
                : 'Please type correct email';
                break;
            case 'password':
                formErrors.password = value.length < 6 
                ? 'Password should be at least 6 characters'
                : "";
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => {console.log(this.state)})
      }

      submitHandler = e => {
          const url = 'http://localhost:3000/'
          e.preventDefault()
          

          if (formValid(this.state)){
            console.log(this.state)
          axios.post(url, this.state)
          .then(response => {
              console.log(response)
              
          })
          .catch(error => {
                console.log(error)

          });
          
      } else {
          console.error("Invalid form");
      }

    }


    render() {

        const email = this.email;
        const password = this.password;
        const { formErrors } = this.state;
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-40%',
              transform             : 'translate(-50%, -50%)',
              width                 : '50%',

            },
            div:{
                alignContent          : 'center',
                font                  : 'Microsoft Tai Le Bold',

                marginRight           : '20%',
            }
          };
        return(

          //style={customStyles}  
      <div >

          
          

        <Modal style={customStyles}   isOpen={ this.props.modalIsOpen }  >
          <form onSubmit={this.submitHandler}>

              <div style={customStyles.div} >
              
              <h3 className="h3" >
                Login: 
              </h3>
                <Input value={email} type="email" className="Input" type="text" name="email"  placeholder="Type Email"
                onChange={this.handleChange}>
                </Input>
                <div>{formErrors.email.length > 0 && (<span className="Span">{formErrors.email}</span>)}</div>
                
                
                
                <h3 className="h3">
                Password:
                </h3>
                <Input value={password} className="Input" type="password" name="password" placeholder="Type Password"
                onChange={this.handleChange} >
                </Input>
                <div>
                {formErrors.password.length > 0 && (<span className="Span">{formErrors.password}</span>)}
                </div>
                
            
                <button  className="Button" type="reset" onClick={this.props.handler1}>
                Cancel
                </button>
            
                <button  className="Button" type="submit" onClick={this.submitHandler} > 
                Login
                </button>
            
            
            
        
        
        </div>
        </form>
          
        </Modal>
        </div>
    )
  }

  

 

}




  export default LogInMenu;