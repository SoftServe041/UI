import React, { useState } from 'react';
import Modal from 'react-modal'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './loginmenu.css';

import axios from 'axios'

const formValid = ({ formErrors, email, password }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    if (email < 1 | password < 1) valid = false

    return valid;
}

const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

class LogInMenu extends React.Component {
    constructor(props) {
        super(props);

        this.cancelButtonHandler = this.cancelButtonHandler.bind(this);

        this.state = {
            email: '',
            password: '',

            formErrors: {
                email: "",
                password: ""
            },
            ifShowFormErrors: false

        }

    }

    cancelButtonHandler() {
        void this.props.disableModal
        void this.forceUpdate
        this.setState({ ifShowFormErrors: false })
        void console.log('cancel Button clicked and ', this.props.disableModal, this.props.ifShowModal)
    }


    handleChange = (e) => {
        //this.setState({[e.target.name]: e.target.value})
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
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
        this.setState({ formErrors, [name]: value }, () => { console.log(this.state) })
    }



    submitHandler = e => {
        const url = 'http://localhost:3000/'
        e.preventDefault()


        if (formValid(this.state)) {
            //void this.props.disableModal
            console.log(this.state)
            axios.post(url, this.state)
                .then(response => {
                    console.log(response)

                })
                .catch(error => {
                    console.log(error)

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
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-40%',
                transform: 'translate(-50%, -50%)',
                width: '50%',

            },
            div: {
                alignContent: 'center',
                font: 'Microsoft Tai Le Bold',
                width: '70%',
                paddingLeft: '30%',

            },
            divButton: {
                width: '100%',


            }

        };
        return (

            <div >


                <Modal style={customStyles} isOpen={this.props.ifShowModal} onRequestClose={this.cancelButtonHandler} >
                    <form onSubmit={this.submitHandler}>

                        <div style={customStyles.div}>
                            <div >
                                <Label className="h3" >    Login:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </Label>



                                <Input value={email} type="email" className="Input" type="text" name="email" placeholder="Type Email"
                                    onChange={this.handleChange}>
                                </Input>

                                <div>{this.state.ifShowFormErrors && (<span className="Span">{formErrors.email}</span>)}</div>
                                <br />

                                <Label className="h3">    Password:      </Label>

                                <Input value={password} className="Input" type="password" name="password" placeholder="Type Password"
                                    onChange={this.handleChange} >
                                </Input>

                                <div>{this.state.ifShowFormErrors && (<span className="Span">{formErrors.password}</span>)}</div>


                            </div>
                            <div>

                            </div>



                            <div style={customStyles.divButton}>

                                <button className="Button" type="submit" onClick={this.submitHandler} >
                                    Login
                                </button>

                                <button className="Button" type="reset" onClick={this.cancelButtonHandler}>
                                    Cancel
                                </button>


                            </div>






                        </div>
                    </form>

                </Modal>
            </div>
        )
    }





}




export default LogInMenu;