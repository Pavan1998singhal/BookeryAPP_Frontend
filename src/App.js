import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Switch>
            <Route path="/navbar" component={Navbar} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
