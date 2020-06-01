import Footer from "../Footer/footer";
import React, {useRef, createRef} from "react";
import "../registration/reg_page.css"
import Header from "../header/Header.js"
import "./billing.css"
import axios from 'axios'
import ModalError from "../error/modalError.js";
import MainPage from "../main_page/Main_page";
import Route from 'react-router-dom';


const cscRegEx = /\b\d{3}\b/;
const cardRegEx = /\b\d{16}\b/;



const formValid = ({ formErrors, ...rest }) => {
    let valid = true;


    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });


    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class Billing extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            cardNumber: null,
            csc: null,
            expDate: null,
            address: null,
            redirect: false,
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
            /*axios.post('https://cargo-testing-board.herokuapp.com/registration/register', {
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                email: this.props.data.email,
                password: this.props.data.password,
                cardNumber: this.state.cardNumber,
                csc: this.state.csc,
                expDate: this.state.expDate,
                address: this.state.address,
            })*/
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: this.props.data.firstName,
                    lastName: this.props.data.lastName,
                    email: this.props.data.email,
                    password: this.props.data.password,
                    cardNumber: this.state.cardNumber,
                    csc: this.state.csc,
                    expDate: this.state.expDate,
                    address: this.state.address, })
            };
            fetch('https://cargo-testing-board.herokuapp.com/registration/register', requestOptions)
                /*.then(response => {window.open('/')})*/
                .then(response => {console.log(response)})
                .catch(error => {this.accessModError(error.toString())});
            /*.then(function(suc) {
                console.log('Axios sucsess:', suc);})
            .catch(this.accessModError);*/
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
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
    render(){
        const { formErrors } = this.state;

        return (
            <div className="App">
                <Header/>
                <div className="Title"> <h1 >Billing details</h1>
                </div>
                <div className="greyComponent">
                    <div id ="Form-container">

                        <form onSubmit={this.handleSubmit} noValidate>

                            <div className="cardNumber">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    name="cardNumber"
                                    onChange={this.handleChange}
                                />
                                {formErrors.cardNumber.length > 0 && (
                                    <span className="errorMessage">{formErrors.cardNumber}</span>
                                )}
                            </div>
                            <div className="csc">
                                <label htmlFor="csc">csc</label>
                                <input
                                    type="password"
                                    placeholder="csc"
                                    name="csc"
                                    onChange={this.handleChange}
                                />
                                {formErrors.csc.length > 0 && (
                                    <span className="errorMessage">{formErrors.csc}</span>
                                )}
                            </div>
                            <div className="expDate">
                                <label htmlFor="expDate">Expiration date</label>
                                <input
                                    placeholder="expDate"
                                    type="month"
                                    name="expDate"
                                    onChange={this.handleChange}
                                />
                                {formErrors.expDate.length > 0 && (
                                    <span className="errorMessage">{formErrors.expDate}</span>
                                )}
                            </div>
                            <div className="address">
                                <label htmlFor="phone">Address</label>
                                <input
                                    placeholder="Address"
                                    type="text"
                                    name="address"
                                    onChange={this.handleChange}
                                />
                                {formErrors.address.length > 0 && (
                                    <span className="errorMessage">{formErrors.phone}</span>
                                )}
                            </div>
                            <div className="createAccount">
                                <button type="submit">Create account</button>
                            </div>
                        </form>


                    </div>
                    <ModalError ref='modError'/>
                   {/* if (this.state.redirect) {
                        <Route exact path="/" co component={MainPage}/>
                    }*/}

                </div>
                <Footer/>
            </div>

        );
    }
}


export default Billing;