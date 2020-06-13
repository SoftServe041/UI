import Footer from "../Footer/footer";
import React, {useRef, createRef} from "react";
import {Row, Col, Form, Container, Button} from 'react-bootstrap';

import Header from "../header/Header";
import HeaderButtons from "../header/HeaderButtons";
import ReactDOM from 'react-dom';

import axios from 'axios'
import ModalError from "../error/modalError.js";
import MainPage from "../main_page/Main_page";
import {Link, BrowserRouter, Route, Redirect} from 'react-router-dom';
import './billing.css'
import App from "../App";

const cscRegEx = /\b\d{3}\b/;
const cardRegEx = /\b\d{16}\b/;


const formValid = ({formErrors, ...rest}) => {
    let valid = true;


    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });


    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

async function sampleFunc(toInput, token) {
    const response = await fetch("https://cargo-testing-board.herokuapp.com/registration/register", {
        myError: null,
        method: "POST",
        mode: "no-cors",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(toInput),
        redirect: "follow",
        referrerPolicy: "no-referrer"
    }).then(response => {console.log(response)});
        //.catch(error => {this.accessModError(error.toString())});
    let body = await response.json();
    console.log(body.id);
    if(response.ok){
        window.location = "/";

    }
}
class Billing extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            cardNumber: null,
            csc: null,
            expDate: '2000-03-21',
            address: null,
            redirect: true,
            formErrors: {
                cardNumber: "",
                csc: "",
                expDate: "",
                address: ""
            }
        }
    }


    accessModError = (error) => {
        this.refs.modError.showModal(error);
    }


    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            const toInput = {
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                email: this.props.data.email,
                password: this.props.data.password,
                cardNumber: this.state.cardNumber,
                csc: this.state.csc,
                expDate: this.state.expDate,
                address: this.state.address,
                phone: this.props.data.phone
            }
                //sampleFunc(toInput)
            console.log('data: ', this.props.data.firstName,
                this.props.data.lastName,
                this.props.data.email,
                this.props.data.password,
                this.state.cardNumber,
                this.state.csc,
                this.state.expDate,
                this.state.address,
                this.state.phone)
            axios.post('https://cargo-testing-board.herokuapp.com/registration/register', {
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                email: this.props.data.email,
                password: this.props.data.password,
                cardNumber: this.state.cardNumber,
                csc: this.state.csc,
                expDate: this.state.expDate,
                address: this.state.address,
            }).then(response => {
                console.log('resp: ', response);
                if(response.ok){
                    window.location = "/";
                    this.props.token(response)
                }
            })
                .catch(error => {this.accessModError(error.toString())});
        } else {
            //console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;

        let formErrors = {...this.state.formErrors};

        switch (name) {
            case "cardNumber":
                formErrors.cardNumber = cardRegEx.test(value)
                    ? ""
                    : "Not valid card number";
                break;
            case "csc":
                formErrors.csc = cscRegEx.test(value)
                    ? ""
                    : "Not valid csc";
                break;
            case "address":
                formErrors.address =
                    value.length < 6
                        ? "minimum 6 characters required"
                        : "";
                break;
        }

        this.setState({formErrors, [name]: value});

    };

    render() {
        const {formErrors} = this.state;

        return (
            <BrowserRouter>
            <div id='body'>
                <Header/>
                <HeaderButtons ifLoggedIn={this.state.ifLoggedIn} handleToken={this.state.handleToken}/>
                <Row id="title-row">
                    <Col md={{span: 3, offset: 5}}>
                        <h2 className="title-text"> Billing </h2>
                    </Col>
                </Row>

                <Container id="load-body">
                    <Row>
                        <Col md={{span: 5, offset: 3}}>
                            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                <Row>
                                    <Col>
                                        <Form.Label column sm={8}>
                                            Card number
                                        </Form.Label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={{span: 6, offset: 0}}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Card Number"
                                            name="cardNumber"
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.cardNumber.length > 0 && (
                                            <span className="errorMessage">{formErrors.cardNumber}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label column sm={8}>
                                            CSC
                                        </Form.Label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={{span: 6, offset: 0}}>
                                        <Form.Control
                                            type="password"
                                            placeholder="csc"
                                            name="csc"
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.csc.length > 0 && (
                                            <span className="errorMessage">{formErrors.csc}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label column sm={8}>
                                            Expiration date
                                        </Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{span: 6, offset: 0}}>
                                        <Form.Control
                                            placeholder="expDate"
                                            type="month"
                                            name="expDate"
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.expDate.length > 0 && (
                                            <span className="errorMessage">{formErrors.expDate}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label column sm={8}>
                                            Address
                                        </Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{span: 6, offset: 0}}>
                                        <Form.Control
                                            placeholder="Address"
                                            type="text"
                                            name="address"
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.address.length > 0 && (
                                            <span className="errorMessage">{formErrors.phone}</span>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{span: 3, offset: 5}}>

                                            <Button id="body-button" type="submit"
                                                    onClick={this.handleSubmit}> Submit </Button>

                                    </Col>
                                </Row>
                            </Form>
                            <ModalError ref='modError'/>

                            {this.state.redirect && (<Route exact path="/" to component={MainPage}/>)}

                        </Col>
                    </Row>
                </Container>


                <Footer/>
            </div>
            </BrowserRouter>
        );
    }
}


export default Billing;