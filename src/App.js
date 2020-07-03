import React, { Suspense, lazy } from 'react';
import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons";
import Footer from "./Footer/footer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';
const Home = lazy(() => import('./main_page/Main_page'));
const RegPage = lazy(() => import('./registration/reg_page'));
const Page404 = lazy(() => import('./error/page404'));
const UsersTabsMain = lazy(() => import('./user_profile/UsersTabsMain'));
const Admin = lazy(() => import('./admin/admin'));
const Results = lazy(() => import('./results/Results'));

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
            <div style={{overflowX: 'hidden'}}>
                <TokenContext.Provider>

                    <Router history={history}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Header />
                            <HeaderButtons ifLoggedIn={this.state.ifLoggedIn}
                                ifAdmin={this.state.ifAdmin}
                                email={this.state.email}
                                handleToken={this.handleToken} />
                            <Switch>
                                <Route exact path="/" component={() => <Home />} />
                                <Route exact path="/registration" component={() => <RegPage />} />
                                <Route exact path="/profile" render={() => <UsersTabsMain data={this.state} />} />
                                <Route exact path="/admin" render={() => <Admin data={this.state} />} />
                                <Route exact path="/routes" render={() => <Results data={this.state} />} />
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