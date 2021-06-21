import React, { Component, SyntheticEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { backendURL } from "../../Config";
import { UserContext } from '../../UserContext';
import "./UserLogin.css";

interface Status {
    isLoggedIn: boolean
}

interface StatusState {
    isLoggedIn: boolean
}

interface LoginInformation {
    email: string
    password: string
}

export default class UserLogin extends Component<Status, StatusState> {
    static contextType = UserContext;
    login: LoginInformation = {
        email: "",
        password: ""
    };

    constructor(props: StatusState) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }


    submit_login = (e: SyntheticEvent) => {
        e.preventDefault();
        this.loginCallApi();
        console.log(this.context);
    }

    async loginCallApi() {
        let httpCode: number = 0;
        let userJWTToken: string = "";
        await fetch(backendURL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": this.login.email,
                "password": this.login.password
            })
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            })
            .then(json => userJWTToken = json.jwt);
        if (httpCode === 200) {
            localStorage.setItem("jwt", userJWTToken);
            this.setState({ isLoggedIn: true });
        } else {
            console.log("Error Login");
        }
    }


    render() {
        return (
            <div className="login-form-container">
                {this.state.isLoggedIn ? <Redirect to="/"></Redirect> :
                    <form onSubmit={this.submit_login}>
                        <div className="empty-div">
                            <h1>Login</h1>
                            <label>Email</label>
                            <input className="form-input" type="email" placeholder="E-Mail" required onChange={e => this.login.email = e.target.value}></input>

                            <label>Password</label>
                            <input className="form-input" type="password" placeholder="Password" required onChange={e => this.login.password = e.target.value}></input>

                            <Link className="text" to="/register">Register</Link>
                            <button className="login-button" type="submit">Login</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}