import React, {Suspense, lazy} from 'react';
import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons";
import Footer from "./Footer/footer";
import UsersTabsMain from "./user_profile/UsersTabsMain";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './App.css';

const Home = lazy(() => import('./main_page/Main_page'));
const RegPage = lazy(() => import('./registration/reg_page'));
const Page404 = lazy(() => import('./error/page404'));

function LoadBody(props) {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/registration" render={() => <RegPage />} />
                    <Route exact path="/profile" render={() => <UsersTabsMain data={props.data} />} />
                    <Route default component={Page404} />
                </Switch>
            </Suspense>
        </Router>);
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifLoggedIn: false,
            token: '',
            userId: '',
            ifAdmin: '',
            userEmail: '',
        };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.handleToken = this.handleToken.bind(this);
    }

    handleToken(data) {
        this.setState({
            token: data.token,
            userId: data.id,
            userEmail: data.email,
            ifAdmin: data.admin,
            ifLoggedIn: true
        });
        console.log(this.state);
    }

    logIn() {
        this.setState({
            ifShowModal: true
        });
    }

    logOut() {
        this.setState({
            ifShowModal: false
        });
    }

    render() {
      const TokenContext = React.createContext(this.handleToken);
        return (
            <div id='body'>
              <TokenContext.Provider>
                <Header />
                <HeaderButtons ifLoggedIn={this.state.ifLoggedIn}
                    handleToken={this.handleToken} />
                <LoadBody data={this.state} />
                <Footer />
                </TokenContext.Provider>
            </div>

        );
    }
}




    export default App;
