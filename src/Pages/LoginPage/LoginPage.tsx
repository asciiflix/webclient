import React, { Component } from "react";
import UserLogin from "../../Components/Login/UserLogin";


export default class LoginPage extends Component {

    render() {
        return (
            <div className="login-container">
                <br></br>
               <UserLogin></UserLogin>
            </div>
        )
    }
}