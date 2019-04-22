import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './routes/Home';

export default class Router extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' render={() => 
          <Home />
        }/>
      </Router>
    );
  }
}
