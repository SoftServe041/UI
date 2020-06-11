import React, { Suspense, lazy } from 'react';
import Header from "./header/Header";
import HeaderButtons from "./header/HeaderButtons";
import Footer from "./Footer/footer";
import UsersTabsMain from "./user_profile/UsersTabsMain";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


const Home = lazy(() => import('./main_page/Main_page'));
const RegPage = lazy(() => import('./registration/reg_page'));
const Page404 = lazy(() => import('./error/page404'));

function LoadBody(props) {
  return(
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
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.state = {
      ifLoggedIn: false,
      token: '',
      userId: 0,
      ifAdmin: false,
    };
  }

  handleToken(token1) {
   //console.log('token from app: ', token);
     this.setState({token: token1});
     this.logIn();
    // {console.log(this.state.token,'token from App')}
  }

  logIn() {
    this.setState({
      ifShowModal: true
    });}



  logOut() {
    this.setState({
      ifShowModal: false
    });

  }


  render() {
    return (
      <div id='body'>
        {
          console.log('effect app', this.state)
        }
          <Header/>
            <HeaderButtons ifLoggedIn={this.state.ifLoggedIn} handleToken={this.handleToken} />

            <LoadBody data={this.state}/>


           <Footer/>

        
        
        
      </div>
      
    );
  }
}




export default App;
