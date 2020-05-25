import React, {Suspense, lazy} from 'react';

import Header from "./header/Header";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';





const Home = lazy(() => import('./main_page/Main_page'));

const LoadBody = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/registration" component={Home}/>
        {
          ////to be continued
        }
        <Route default component={Home}/>
      </Switch>
    </Suspense>
  </Router>
);




class App extends React.Component{

//dsdf = '';

  constructor(props){
    super(props);
    //this.dsdf = 'testing';
  }


  render(){
    return (
      <div>
       <Header />
       <LoadBody/>

      </div>
     );
  }
}




export default App;
