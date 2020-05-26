import React, { Component } from 'react';
import '../main_page/main_page.css';
import './error.css';
import Hero from './Hero';
import Header from '../header/Header';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: '**',
        }
    }
   
    componentDidCatch(err, info){
    let errorInformation = Object.values(info);  
    this.setState({
            hasError: true,
            errorInfo: errorInformation,
    });
    }

    render() {
        if (this.state.hasError) {   
          return (
              <div>
                  <p className = 'client-side-error'>{this.state.errorInfo}</p>
              </div>
          );
        } 
        return this.props.children;           
    }
}

export function TestBoundary() {
    return(
        <div>
            <Header/>
            <div className="Title"> <h1 >TestBoundary</h1> </div>
            <div className="Main-background">
                <ErrorBoundary>
                  <Hero heroName='Batman'/>
                </ErrorBoundary>
                <ErrorBoundary>
                  <Hero heroName='Superman'/>
                </ErrorBoundary>
                <ErrorBoundary>
                  <Hero heroName='Joker'/>
                </ErrorBoundary>
                <ErrorBoundary>
                  <Hero heroName='Ironman'/>
                </ErrorBoundary>
            </div>
        </div>
    )
}