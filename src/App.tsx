import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import checkForJwtExpiration from './Common/Helper/JwtExpManager';
import { getJwtTokenFromStorage, JwtConext, JwtUserInfo, saveJwtToken, updateUsername as updateUsernameAndJwt } from './Common/JwtContext/JwtContext';
import TitleBar from './Common/TitleBar/TitleBar';
import "./Global.css";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/LoginPage/RegisterPage';
import Logout from './Pages/LogoutPage/Logout';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import VideoPage from './Pages/VideoPage/VideoPage';


interface AppProps {

}

interface AppState {
  jwtUserInfo: JwtUserInfo
  changeJwt: Function
}

export default class App extends React.Component<AppProps, AppState>{

  constructor(props: AppProps) {
    super(props);
    this.state = {
      jwtUserInfo: {
        username: "",
        jwtToken: "",
      },
      changeJwt: (newJwtToken: string) => {
        updateUsernameAndJwt((uname:string) => this.setState({jwtUserInfo: {username: uname, jwtToken: newJwtToken}}), newJwtToken);
        saveJwtToken(newJwtToken);
        this.setState(({jwtUserInfo}) => ({jwtUserInfo: {username: "", jwtToken: newJwtToken}}));
      }
    };
    checkForJwtExpiration();
  }
  componentDidMount() {
    console.log("WTF")
    let jwt: string = getJwtTokenFromStorage();
    updateUsernameAndJwt((uname:string) => this.setState({jwtUserInfo: {username: uname, jwtToken: jwt}}), jwt);
  }

  // getInformation = () => {
  //   //Check if JWT is expired
  //   jwtExpManager();
  //   //To login stuff
  //   let userJWT: string = localStorage.getItem("jwt") as string;
  //   let userID: any = jwt_decode(userJWT);
  //   let usrCtxt: UserLoginContext;

  //   if (userJWT === null || userID === null) {
  //     usrCtxt = new UserLoginContext("", "", this.state.userContext.rerender);
  //   } else {
  //     this.getUserName(userID["User_ID"]);
  //     usrCtxt = new UserLoginContext(userJWT, this.state.userContext.username, this.state.userContext.rerender);
  //   }
  //   return usrCtxt;
  // }

  // async getUserName(userID: string) {
  //   await getUserNameFromAPI(userID)
  //     .then(response => {
  //       // this.setState({ username: response })
  //     });
  // }

  render() {
    return (
      <div>
        <Router>
          <JwtConext.Provider value={{jwtUserInfo: this.state.jwtUserInfo, changeJwt: this.state.changeJwt}}>
            <TitleBar/>
            <div className="main-content">
              <Switch>
                <Route path="/watch/:videoId" component={VideoPage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/logout" component={Logout} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </JwtConext.Provider>
        </Router>
      </div>
    )
  }
}