import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import checkForJwtExpiration from './Common/Helper/JwtExpManager';
import { getJwtTokenFromStorage, getUsernameFromStorage, JwtConext, JwtUserInfo, updateUsername as updateUsernameAndJwt } from './Common/JwtContext/JwtContext';
import TitleBar from './Common/TitleBar/TitleBar';
import "./Global.css";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import "./App.css"
import "./Global.css"
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage';
import RegisterPage from './Pages/LoginPage/RegisterPage';
import Logout from './Pages/LogoutPage/Logout';
import SearchPage from './Pages/SearchPage/SearchPage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import UploadPage from './Pages/UploadPage/UploadPage';
import VideoPage from './Pages/VideoPage/VideoPage';
import VideoEditPage from './Pages/VideoEditPage/VideoEditPage';


interface AppProps {

}

interface AppState {
  jwtUserInfo: JwtUserInfo
  changeJwt: Function
}

export default class App extends React.Component<AppProps, AppState>{

  constructor(props: AppProps) {
    super(props);
    let jwtToken: string = getJwtTokenFromStorage();
    let username: string = getUsernameFromStorage();
    username = username === null? '': username;
    jwtToken = jwtToken === null? '': jwtToken;
    this.state = {
      jwtUserInfo: {
        username: username,
        jwtToken: jwtToken,
      },
      changeJwt: (newJwtToken: string) => {
        updateUsernameAndJwt((uname:string) => this.setState({jwtUserInfo: {username: uname, jwtToken: newJwtToken}}), newJwtToken);
      }
    };
    checkForJwtExpiration();
  }
  componentDidMount() {
    let jwt: string = getJwtTokenFromStorage();
    updateUsernameAndJwt((uname:string) => this.setState({jwtUserInfo: {username: uname, jwtToken: jwt}}), jwt);
  }

  render() {
    return (
      <div>
        <Router>
          <JwtConext.Provider value={{jwtUserInfo: this.state.jwtUserInfo, changeJwt: this.state.changeJwt}}>
            <TitleBar/>
            <div className="main-content">
              <Switch>
                <Route path="/watch/:videoId" component={VideoPage} />
                <Route path="/user/:userId" component={UserProfilePage} />
                <Route path="/edit/:videoId" component={VideoEditPage} />
                <Route path="/upload" component={UploadPage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/logout" component={Logout} />
                <Route path="/search" component={SearchPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </JwtConext.Provider>
        </Router>
      </div>
    )
  }
}