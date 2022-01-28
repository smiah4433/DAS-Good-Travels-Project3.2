import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Nav'
import Map from './components/Map';
import Travel from './components/Travel';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Map />
    <Travel />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
