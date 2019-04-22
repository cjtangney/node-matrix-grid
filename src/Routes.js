import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './routes/Home/Home';

export default function Routes() {
  return (
    <Router>
      <Route exact path='/' render={() => 
        <Home />
      }/>
    </Router>
  );
}
