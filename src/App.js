import React from 'react';

import Header from "./header/Header";
import MainPage from "./main_page/Main_page";

/*import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))


const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MainPage}/>
    </Switch>
  </main>
)
*/


/*
function renderSwitch() {
  switch() {
    case '/':
      return <MainPage />;
    default:
      return 'foo';
  }
}
{this.renderSwitch()}
*/

function App() {
  return (
   <div>
    <Header />
    
    <MainPage />

   </div>
  );
}


export default App;
