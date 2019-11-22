import React from 'react';
import logo from './logo.svg';
import './App.css';
import pgp from 'pg-promise';

const config = {
  host: 'localhost',
  port: 5432,
  database: 'finance_funday',
  user: 'tinle',
  password: '',
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
};


const db = pgp(config);


//const { db } = require('../connections/redshift');

db.any('SELECT * FROM product WHERE price BETWEEN $1 AND $2', [1, 10])


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          xEdit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
