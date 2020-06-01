import React, { Suspense, lazy } from 'react';
import Header from "./header/Header";
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
      <Container fluid id='body'>
        <div id='header'>
          <Header/>
        </div>
        {/* <div id='frame-body' className='fluid'> */}
          <div id='load-body'>
            <LoadBody/> 
          </div>
        {/* </div> */}
       
        <div id='footer'>
           <Footer/>
        </div>
        
        
        
      </Container>
      
    );
  }
}




export default App;
