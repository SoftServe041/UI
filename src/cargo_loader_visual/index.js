import React from 'react';
import ReactDOM from 'react-dom';
import './cargo_loader_visual/index.css';
import * as serviceWorker from './cargo_loader_visual/serviceWorker';
import App from './cargo_loader_visual/App.js'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
