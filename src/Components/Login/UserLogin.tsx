import React, { Component, SyntheticEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwt_decode from '../../Common/Helper/JwtDecoder';
import { getUserNameFromAPI } from '../../Common/Helper/UsernameApi';
import { backendURL } from "../../Config";
import { UserContext } from '../../UserContext';
import "./UserLogin.css";

interface Status {
    isLoggedIn: boolean
}

interface StatusState {
    isLoggedIn: boolean
    hasFailedLogin: boolean
    jwtToken: string
    username: string
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
            isLoggedIn: false,
            hasFailedLogin: false,
            jwtToken: "",
            username: ""
        };
    }

    submit_login = (e: SyntheticEvent) => {
        e.preventDefault();
        this.loginCallApi();
    }

    async loginCallApi() {
        let httpCode: number = 0;
        let userJWTToken: string = "";
        let username: string = "";
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
            //Getting User Name
            await getUserNameFromAPI(jwt_decode(userJWTToken)["User_ID"])
                .then(response => {
                    username = response;
                });
            this.setState({ isLoggedIn: true, jwtToken: userJWTToken, username: username });
        } else {
            this.setState({ hasFailedLogin: true })
        }
    }


    finalizeLogin = (jwtSetter: Function, usernameSetter: Function, rerender: Function) => {
        localStorage.setItem("jwt", this.state.jwtToken);
        rerender(this.state.jwtToken, this.state.username);
        return <Redirect to="/"></Redirect>;
    }

    render() {
        return (
            <div className="login-form-container">
                <UserContext.Consumer>
                    {({ jwtToken, username, setUsername, setJwtToken, rerender }) => (
                        // TODO remove error from calling this, maybe move to async somehow?!
                        this.state.isLoggedIn ? this.finalizeLogin(setJwtToken, setUsername, rerender) :
                            <form onSubmit={this.submit_login}>
                                <div className="empty-div">
                                    <h1 className="form-title-text">Login</h1>
                                    {this.state.hasFailedLogin ? <p className="login-form-failed-login">Login Failed, please try again</p> : <></>}
                                    <label className="form-label-text">Email</label>
                                    <input className="form-input" type="email" placeholder="E-Mail" required onChange={e => this.login.email = e.target.value}></input>

                                    <label className="form-label-text">Password</label>
                                    <input className="form-input" type="password" placeholder="Password" required onChange={e => this.login.password = e.target.value}></input>

                                    <Link className="text" to="/register">Register</Link>
                                    <button className="login-button" type="submit" onClick={() => { setUsername("hello") }}>Login</button>
                                </div>
                            </form>
                    )}
                </UserContext.Consumer>
            </div>
        )
    }
}