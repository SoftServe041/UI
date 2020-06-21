import React, { Suspense, lazy } from 'react';
import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons";
import Footer from "./Footer/footer";
//import UsersTabsMain from "./user_profile/UsersTabsMain";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

const Home = lazy(() => import('./main_page/Main_page'));
const RegPage = lazy(() => import('./registration/reg_page'));
const Page404 = lazy(() => import('./error/page404'));
const UsersTabsMain = lazy(() => import('./user_profile/UsersTabsMain'));

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

                    <Router>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Header />
                            <HeaderButtons ifLoggedIn={this.state.ifLoggedIn}
                                handleToken={this.handleToken} />
                            <Switch>
                                <Route exact path="/" component={() => <Home />} />
                                <Route exact path="/registration" component={() => <RegPage />} />
                                <Route exact path="/profile" render={() => <UsersTabsMain data={this.state} />} />
                                <Route default component={Page404} />
                            </Switch>
                            <Footer />
                        </Suspense>
                    </Router>
                </TokenContext.Provider>
            </div>

        );
    }
}




export default App;
