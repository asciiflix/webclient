import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TitleBar from './Common/TitleBar/TitleBar';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import "./App.css"
import "./Global.css"
import VideoPage from './Pages/VideoPage/VideoPage';
import RegisterPage from './Pages/LoginPage/RegisterPage';
import UserLoginContext, { UserContext } from './UserContext';
import Logout from './Pages/LogoutPage/Logout';
import { backendURL } from './Config';


interface AppProps {

}

export default class App extends React.Component<AppProps, UserLoginContext>{

  constructor(props: AppProps) {
    super(props);
    this.state = new UserLoginContext("", "", (jwtToken: string, username: string) => {
      this.setState({
        jwtToken: jwtToken,
        username: username
      })
    });

    this.getInformation();
  }
  componentDidMount() {
    this.setState(this.getInformation());
  }

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
    let userID: any = this.jwt_decode(userJWT);
    let usrCtxt: UserLoginContext;

    if (userJWT === null || userID === null) {
      usrCtxt = new UserLoginContext("", "", this.state.rerender);
    } else {
      this.getUserName(userID["User_ID"]);
      usrCtxt = new UserLoginContext(userJWT, this.state.username, this.state.rerender);
    }
    return usrCtxt;
  }

  async getUserName(userID: string) {
    await this.getUserNameFromAPI(userID)
      .then(response => {
        this.setState({ username: response })
      });
  }

  async getUserNameFromAPI(userID: string) {
    let httpCode: number = 0;
    let fetchedUsername: string = "";
    await fetch(backendURL + "/user/getUser?id=" + userID)
      .then(response => {
        httpCode = response.status;
        return response.json();
      })
      .then(json => fetchedUsername = json.Name);
    if (httpCode === 200) {
      return fetchedUsername;
    } else {
      return "UltraSecretUser";
    }
  }

  render() {
    return (
      <div>
        <Router>
          <UserContext.Provider value={this.state}>
            <TitleBar username={this.state.username} />
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
