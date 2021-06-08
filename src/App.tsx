import React from 'react'
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/" component={HomePage}/>
        </Switch>
      </Router>
    )
  }
}
