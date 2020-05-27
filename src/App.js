import React, { Suspense, lazy } from 'react';

import Header from "./header/Header";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';





const Home = lazy(() => import('./main_page/Main_page'));

const LoadBody = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/registration" component={Home} />
        {
          ////to be continued
        }
        <Route default component={Home} />
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
        <Header ifLoggedIn={this.state.ifLoggedIn} />
        {console.log('If user logged in in App', this.state.ifLoggedIn)}
        <LoadBody />

      </div>
    );
  }
}




export default App;
