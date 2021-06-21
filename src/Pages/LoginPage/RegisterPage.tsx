import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserRegistration from "../../Components/Register/UserRegistration";
import { UserContext } from "../../UserContext";


export default class RegisterPage extends Component {
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
                <UserRegistration isRegistered={false}></UserRegistration>
            </div>
        )
    }
}