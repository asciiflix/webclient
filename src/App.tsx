import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TitleBar from './Common/TitleBar/TitleBar';
import Logout from './Components/Logout/Logout';
import "./Global.css";
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import VideoPage from './Pages/VideoPage/VideoPage';
import { UserContext } from './UserContext';

export default class App extends React.Component {
  jwt_decode = (input: string) => {
    if (input !== null) {
      var parts = input.split('.'); // header, payload, signature
      return JSON.parse(atob(parts[1]));
    } else {
      return null
    }
  }

  getInformation = () => {
    let userJWT: string = localStorage.getItem("jwt") as string;
    let username: string = this.jwt_decode(userJWT);

    if (userJWT === null || username === null) {
      return null;
    } else {
      return { jwtToken: userJWT, username: username};
    }
  }

  render() {
    return (
      <div>
        <Router>
          <UserContext.Provider value={this.getInformation()}>
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
