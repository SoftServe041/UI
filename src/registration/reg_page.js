import Footer from "../Footer/footer";
import React from "react";
import "./reg_page.css"
import Header from "../header/Header.js"
import Billing from "../Billing/billing";
import ReactDOM from 'react-dom';

const emailRegex = RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[a-zA-Z0-9-]$/
);
const phoneRegex = RegExp(
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
);
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class RegPage extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            repeatPassword: null,
            phone: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                repeatPassword: "",
                phone: "",
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            ReactDOM.render(<Billing data = {this.state}/>,
                document.getElementById('root'));
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characters required" : "";
                break;
            case "repeatPassword":
                formErrors.repeatPassword = this.state.password === value ? "" : "password doesnt match";
                break;
            case "phone":
                formErrors.phone = phoneRegex.test(value)
                    ? ""
                    : "invalid phone number";
                break;
        }

        this.setState({ formErrors, [name]: value });
    };
    render(){
        const { formErrors } = this.state;

        return (
            <div className="App">
                <div className="Title"> <h1 >Registration</h1>
                </div>

                <div className="greyComponent">
                    <div id ="Form-container">
                    
                        <form onSubmit={this.handleSubmit} noValidate>


                            <div id="left-container">

                            <div id="forms" className="firstName">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={this.handleChange}
                                />
                                {formErrors.firstName.length > 0 && (
                                    <span className="errorMessage">{formErrors.firstName}</span>
                                )}
                            </div>
                                <div id="forms" className="email">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.email.length > 0 && (
                                        <span className="errorMessage">{formErrors.email}</span>
                                    )}
                                </div>
                                <div id="forms" className="password">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.password.length > 0 && (
                                        <span className="errorMessage">{formErrors.password}</span>
                                    )}
                                </div>
                                <div className="repeatPassword">
                                    <label htmlFor="repeatPassword">Repeat password</label>
                                    <input
                                        placeholder="Repeat password"
                                        type="password"
                                        name="repeatPassword"
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.repeatPassword.length > 0 && (
                                        <span className="errorMessage">{formErrors.repeatPassword}</span>
                                    )}
                                </div>
                            </div>
                            <div id="forms" id="right-container">
                                <div id="forms" className="lastName">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.lastName.length > 0 && (
                                        <span className="errorMessage">{formErrors.lastName}</span>
                                    )}
                                </div>
                            <div className="phone">
                                <label htmlFor="phone">Phone number</label>
                                <input
                                    placeholder="Phone number"
                                    type="phone"
                                    name="phone"
                                    onChange={this.handleChange}
                                />
                                {formErrors.phone.length > 0 && (
                                    <span className="errorMessage">{formErrors.phone}</span>
                                )}
                            </div>
                            </div>

                            <div className="createAccount">
                                <button type="submit">Proceed with billing details</button>
                            </div>
                        </form>


                </div>
                </div>
                <Footer/>
            </div>

        );
    }
}


export default RegPage;