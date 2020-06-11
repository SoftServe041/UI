import React, { Suspense, lazy } from 'react';
import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons";
import Footer from "./Footer/footer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './App.css';





const Home = lazy(() => import('./main_page/Main_page'));
const RegPage = lazy(() => import('./registration/reg_page'));
const Page404 = lazy(() => import('./error/page404'));

const LoadBody = () => (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/registration" component={RegPage} />
          <Route default component={Page404} />
        </Switch>
      </Suspense>
    </Router>
);




class App extends React.Component {

  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.state = {
      ifLoggedIn: false,
      token: '',
      userId: 0,
    };
  }

  handleToken(e) {
    this.setState({token: e.target.token});
    {console.log(this.state.token,'token from App')}
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
    return (
      <div id='body'>

          <Header/>
            <HeaderButtons ifLoggedIn={this.state.ifLoggedIn} handleToken={this.state.handleToken} />

            <LoadBody/>

           <Footer/>

      </div>
      
    );
  }
}




export default App;
