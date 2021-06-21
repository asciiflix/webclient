import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserLogin from "../../Components/Login/UserLogin";
import { UserContext } from "../../UserContext";


export default class LoginPage extends Component {
    static contextType = UserContext;

    getUserState = () => {
        if (this.context === null) {
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
                <UserLogin isLoggedIn={this.getUserState()}></UserLogin>
            </div>
        )
    }
}