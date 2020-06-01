
import React, {Suspense, lazy, useState} from 'react';

import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons"
//import Footer from "./Footer/footer";
import 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginMenu from "./header/LoginMenu";

import 'bootstrap/dist/css/bootstrap.min.css';
const Home = lazy(() => import('./main_page/Main_page'));
//const RegPage = lazy(() => import('./registration/reg_page'));
//const Billing = lazy(() => import('./Billing/billing'));
//const NotFound = lazy(() => import('./error/page404'));




const LoadBody = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={Home}/>
                {
                    //<Route exact path="/registration" component={RegPage} />
                    //<Route exact path="/add-card" component={Billing} />


                    ////to be continued
                    //<Route exact path="/about-our-company" component={Billing} />
                    //<Route exact path="/account" component={Account} />
                    //<Route default component={NotFound} />
                }
            </Switch>
        </Suspense>
    </Router>
);


class App extends React.Component {

    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        //this.setToken = this.setToken.bind(this);
        this.state = {
            ifLoggedIn: false,
            token: '',
            userId: 0
        };
    }

    logIn() {
        this.setState({ifShowModal: true});
    }


    logOut() {
        this.setState({ifShowModal: false});
    }

    /*
    setToken(){
        this.useState({token: () => {<LoginMenu />}})
    }

     */



    render() {
        return (
            <div>

                <Header/>
                <HeaderButtons ifLoggedIn={this.state.ifLoggedIn} setToken={this.state.setToken}/>
                <LoadBody/>


                {
                    //<Footer />
                }
            </div>
        );
    }
}


export default App;
