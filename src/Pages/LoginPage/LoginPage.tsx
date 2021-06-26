import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import UserLogin from "../../Components/Login/UserLogin";
import { EMPTY_USER_CONTEXT, UserContext } from "../../UserContext";


export default class LoginPage extends Component {
    static contextType = UserContext;

    getUserState = () => {
        if (this.context === EMPTY_USER_CONTEXT || this.context.jwtToken === "") {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="login-container">
                {this.getUserState() ? <Redirect to="/"></Redirect> :
                    <br></br>
                }
                <JwtConext.Consumer>
                {({jwtUserInfo, changeJwt}) => 
                    <UserLogin isLoggedIn={this.getUserState()} changeJwt={changeJwt}></UserLogin>
                    }
                </JwtConext.Consumer>
            </div>
        )
    }
}