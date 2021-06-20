import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import TitleBar from './Common/TitleBar/TitleBar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import "./App.css"
import "./Global.css"
import VideoPage from './Pages/VideoPage/VideoPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContext } from './UserContext';
import Logout from './Components/Logout/Logout';

export default class App extends React.Component {
  userJWT = localStorage.getItem("jwt");

  render() {
    return (
      <div>
        <Router>
          <UserContext.Provider value={this.userJWT}>
            <TitleBar />
            <div className="main-content">
              <Switch>
                <Route path="/watch/:videoId" component={VideoPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/logout" component={Logout} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    )
  }
}
