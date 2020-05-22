import React from 'react';
import './main_page.css';


class MainPage extends React.Component{

render(){
    return(
        <div>
        <div className="Title"> <h1 >Search Routs </h1>
        </div>



        <div className="Main-background">
        
          <div className="Div-Body">
              <h2>Location:</h2>

              
          </div>

          <div className="Div-Body">
              <h2>Cargo Information:</h2>

              
          </div>

          <div className="Div-Body">
              <button className="Button-Search"> Search </button>

              
          </div>
          
     </div>

     </div>
    );
    }
}


export default MainPage;