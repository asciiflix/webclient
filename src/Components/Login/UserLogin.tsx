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
    hasFailedLogin: boolean
    jwtToken: string
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
            jwtToken: ""
        };
    }


    submit_login = (e: SyntheticEvent) => {
        e.preventDefault();
        this.loginCallApi();
    }

    setNewInfo = () => {}

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
            this.setState({ isLoggedIn: true, jwtToken: userJWTToken});
        } else {
            this.setState({hasFailedLogin:true})
        }
    }

    finalizeLogin = (jwtSetter: Function, rerender: Function) => {
        localStorage.setItem("jwt", this.state.jwtToken);
        rerender(this.state.jwtToken, "Ultramannnn");
        return <Redirect to="/"></Redirect>;
    }

    render() {
        return (
            <div className="login-form-container">
            <UserContext.Consumer>
                {({jwtToken, username, setUsername, setJwtToken, rerender}) => (
                // TODO remove error from calling this, maybe move to async somehow?!
                this.state.isLoggedIn ? this.finalizeLogin(setJwtToken, rerender) :
                    <form onSubmit={this.submit_login}>
                        <div className="empty-div">
                            <h1>Login</h1>
                            {this.state.hasFailedLogin?<p className="login-form-failed-login">Login Failed, please try again</p>:<></>}
                            <label>Email</label>
                            <input className="form-input" type="email" placeholder="E-Mail" required onChange={e => this.login.email = e.target.value}></input>

                            <label>Password</label>
                            <input className="form-input" type="password" placeholder="Password" required onChange={e => this.login.password = e.target.value}></input>

                            <Link className="text" to="/register">Register</Link>
                            <button className="login-button" type="submit" onClick={()=>{setUsername("hello")}}>Login</button>
                        </div>
                    </form>
                )}
            </UserContext.Consumer>
            </div>
        )
    }
}