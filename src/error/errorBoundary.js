import React, { Component } from 'react';
import '../main_page/main_page.css';
import './error.css';
import Hero from './Hero';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            info: '**',
        }
    }
    static getDerivedStateFromError(err) {
        return {
            hasError : true,
        }
    }
    componentDidCatch(err, infor){
        // it is necessary to return info to instance var info
        console.log('err didcatch', JSON.stringify(infor));
        this.state.info = JSON.stringify(infor);
        console.log('err didcatch', this.state.info);
        return {
            info : JSON.stringify(infor)
        }
    };

    render() {
        if (this.state.hasError) {   
          return (
              <div>
                  <p className = 'client-side-error'>Something went wrong {this.state.info}</p>
              </div>
          );
        } 
        return this.props.children;           
    }
}

export function TestBoundary() {
    return(
        <div>
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