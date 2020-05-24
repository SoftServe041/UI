import Footer from "../Footer/footer";
import React from "react";
import "./reg_page.css"
import Header from "../header/Header.js"

class RegPage extends React.Component{
    render(){
        return (
            <div className="App">

                <div className="greyComponent">
                        <h1>Create account</h1>
                        <form onSubmit={this.handleSubmit} noValidate>

                            <div className="firstName">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="First Name"
                                    type="text"
                                    name="firstname"
                                    noValidate
                                    onSubmit={this.handleChange}
                                />
                            </div>
                            <div className="lastName">
                                <label htmlFor="lastName">First Name</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="First Name"
                                    type="text"
                                    name="lastName"
                                    noValidate
                                    onSubmit={this.handleChange}
                                />
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    noValidate
                                    onSubmit={this.handleChange}
                                />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    className=""
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    onSubmit={this.handleChange}
                                />
                            </div>
                        </form>

                    {/*<form>
                    <label>
                        E-mail
                        <input type="e-mail" name="mail" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form>
                    <label>
                        Password
                        <input type="password" name="pass" />
                    </label>
                </form>
                <form>
                    <label>
                        Repeat password
                        <input type="password" name="repass" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>*/}

                </div>
                <Footer/>
            </div>

        );
    }
}


export default RegPage;