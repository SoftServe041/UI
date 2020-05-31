import React, {lazy, useState} from 'react';
//import Modal from 'react-modal'
import Modal from 'react-bootstrap/Modal'
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dialog, {Button, Col, Form, Row} from 'react-bootstrap'
import './loginmenu.css';
import axios from 'axios'
import Label from "reactstrap/es/Label";




const formValid = ({ formErrors, email, password }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    /*
        if (email < 1 | password < 1) valid = false
        */
    if (email.length < 1){valid= false;  return valid}
    if (password.length < 1){valid= false;  return valid}

    return valid;
}

//RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
// Final RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[a-zA-Z0-9-]$/)
//Marina's RegExp(/^((\w+.*\w+)@(\w+.\w+))$/)
const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[a-zA-Z0-9-]$/)



class LogInMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            formErrors: {
                email: "",
                password: ""
            },
            ifFieldsEmpty: false,
            ifLoginDetailsIncorrect: false,
        }

    }

    handleChange = (e) => {
        //this.setState({[e.target.name]: e.target.value})

        e.preventDefault();
        this.setState({ifFieldsEmpty: false})
        this.setState({ifLoginDetailsIncorrect: false})
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;


        switch (name) {
            case 'email':
                formErrors.email =
                    emailRegex.test(value)
                        ? ''
                        : 'Please type correct email';
                this.setState({ ifShowFormErrors: false })
                break;
            case 'password':
                formErrors.password = value.length < 6
                    ? 'Password should be at least 6 characters'
                    : "";
                this.setState({ ifShowFormErrors: false })
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => { console.log(this.state) })

    }


//this.state

    submitHandler = e => {
        const url = 'https://cargo-testing-board.herokuapp.com/login'
        if (this.state.email.length < 1){ this.setState({ifFieldsEmpty: true}) }
        if (this.state.password.length < 1){this.setState({ifFieldsEmpty: true}) }
        e.preventDefault()

        const data = {
            email : this.state.email,
            password: this.state.password
        }

        if (formValid(this.state)) {

            console.log(this.state)
            console.log(axios.post(url, data
				))
            axios.post(url, this.state)
                .then(response => {
                    console.log(response)


                })
                .catch(error => {
                    console.log(error)
                    this.setState({ifLoginDetailsIncorrect: true})
                    /*
                    {function setToken()
                    { return(error)}

                    }
                    */

                });

        } else {
            this.setState({ ifShowFormErrors: true })
            console.error("Invalid form");



        }

    }

    render() {

        const email = this.email;
        const password = this.password;
        const { formErrors } = this.state;

        return (

                <Modal   show={this.props.ifShowModal}
                         size="lg"
                         aria-labelledby="contained-modal-title-vcenter"
                         centered

                         >
                    { (this.state.ifLoginDetailsIncorrect)  && (<span className="Span">Email or password are incorrect</span>)}

                    <Form onSubmit={this.submitHandler}>


                            <Row >

                                <Label className="h3" >    Login:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </Label>

                                <Form.Control value={email} type="email" className="Input"  name="email" placeholder="Type Email"
                                    onChange={this.handleChange}>
                                </Form.Control>

                                <Row>{this.state.ifShowFormErrors && (<span className="Span">{formErrors.email}</span>)}</Row>
                                <br />



                                <Label className="h3">    Password:      </Label>

                                <Form.Control value={password} className="Input" type="password" name="password" placeholder="Type Password"
                                    onChange={this.handleChange} >
                                </Form.Control>

                                <Row>{this.state.ifShowFormErrors  && (<span className="Span">{formErrors.password}</span>)}</Row>
                            </Row>
                            <Row>
                                    { (this.state.ifFieldsEmpty)  && (<span className="Span">Please make sure that you have filled all fields</span>)}

                            </Row>

                            <Row >

                                <Button className="Button" type="submit" onClick={this.submitHandler} >
                                    Login
                                </Button>

                                <Button className="Button" type="reset" onClick={this.props.disableModal}   >
                                    Cancel
                                </Button>


                            </Row>
                    </Form>

                </Modal>

            
        )
        
    }

}




export default LogInMenu;

