import React, { Suspense, lazy } from 'react';

import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons"
//import Footer from "./Footer/footer";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';





const Home = lazy(() => import('./main_page/Main_page'));
//const RegPage = lazy(() => import('./registration/reg_page'));
//const Billing = lazy(() => import('./Billing/billing'));
//const NotFound = lazy(() => import('./error/page404'));

const LoadBody = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        {
        //<Route exact path="/registration" component={RegPage} />
        //<Route exact path="/add-card" component={Billing} />
        //<Route exact path="/about-our-company" component={Billing} />
        
          ////to be continued
        
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
    this.state = {
      ifLoggedIn: false,
    };
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
      <div>

                  <Header />
                  <HeaderButtons ifLoggedIn={this.state.ifLoggedIn} />
                  <LoadBody />
        

        {
        //<Footer />
        }
      </div>
    );
  }
}




export default App;
