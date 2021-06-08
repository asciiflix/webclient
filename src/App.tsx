import React from 'react'
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import TitleBar from './Common/TitleBar/TitleBar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import "./App.css"

export default class App extends React.Component {
  render() {
    return (
      <div>
          <Router>
            <TitleBar/>
            <div className="main-content">
              <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/" component={HomePage}/>
              </Switch>
            </div>
          </Router>
      </div>
    )
  }
}
