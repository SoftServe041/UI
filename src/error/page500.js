import React, { Component } from 'react';
import '../main_page/main_page.css';
import './error.css';
import page500 from './page500.jpg';
import Header from '../header/Header';

export default class Page500 extends Component {
    render() {
        return(
            <div>
               <Header/>
               <div className="Title">
                   <h1>Error</h1>
               </div>
               <div className="Main-background">
                  <img src={page500} className='error-image' alt="page not found"/>
                  {/* <div>exception reason from server</div> */}
                </div>
            </div>
        );
    }
}