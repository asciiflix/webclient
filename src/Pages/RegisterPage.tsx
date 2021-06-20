import React, { Component } from "react";
import UserRegistration from "../Components/Register/UserRegistration";


export default class RegisterPage extends Component {

    render() {
        return (
            <div className="login-container">
                <br></br>
               <UserRegistration></UserRegistration>
            </div>
        )
    }
}