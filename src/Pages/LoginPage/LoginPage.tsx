import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import UserLogin from "../../Components/Login/UserLogin";


export default class LoginPage extends Component {
    getUserState = (jwtToken: string) => {
        if (jwtToken === "") {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <JwtConext.Consumer>
                {({jwtUserInfo, changeJwt}) => 
                    <div className="login-container">
                        {this.getUserState(jwtUserInfo.jwtToken) ? <Redirect to="/"></Redirect> :
                            <br></br>
                        }
                        <UserLogin isLoggedIn={this.getUserState(jwtUserInfo.jwtToken)} changeJwt={changeJwt}></UserLogin>
                    </div>
                }
            </JwtConext.Consumer>
        )
    }
}