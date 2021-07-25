import React, { Component, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { backendURL } from "../../Config";
import "./UserRegistration.css";

interface RegisterInformation {
    username: string
    email: string
    password: string
    password_r: string
}

interface Status {
    isRegistered: boolean
}

interface StatusState {
    isRegistered: boolean,
    wrongPW: boolean,
    error: boolean
}

export default class UserRegistration extends Component<Status, StatusState> {

    //Interface to Store Form Data
    register: RegisterInformation = {
        username: "",
        email: "",
        password: "",
        password_r: ""
    };

    constructor(props: StatusState) {
        super(props);
        this.state = {
            isRegistered: props.isRegistered,
            wrongPW: false,
            error: false
        };
    }


    //Submit Handler
    submit_register = (e: SyntheticEvent) => {
        e.preventDefault();
        if (this.register.password !== this.register.password_r) {
            this.setState({ wrongPW: true });
        } else {
            this.setState({ wrongPW: false });
            this.registerCallApi();
        }
    }


    //Post Request to Register a new User
    async registerCallApi() {
        let httpCode: number = 0;
        await fetch(backendURL + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": this.register.username,
                "email": this.register.email,
                "password": this.register.password
            })
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            });
        if (httpCode === 201) {
            this.setState({ isRegistered: true })
        } else {
            this.setState({ error: true })
        }
    }

    render() {
        return (
            <div className="login-form-container">
                {this.state.isRegistered ? <Redirect to="/login"></Redirect> :
                    <form onSubmit={this.submit_register}>
                        <div className="empty-div">
                            <h1 className="form-title-text">Register</h1>
                            {this.state.wrongPW ? <p className="login-form-failed-login">Password does not match</p> : <></>}
                            {this.state.error ? <p className="login-form-failed-login">Registration Error</p> : <></>}
                            <label>Username</label>
                            <input className="form-input" type="name" placeholder="Username" required onChange={e => this.register.username = e.target.value}></input>

                            <label>Email</label>
                            <input className="form-input" type="email" placeholder="E-Mail" required onChange={e => this.register.email = e.target.value}></input>

                            <label>Password</label>
                            <input className="form-input" type="password" placeholder="Password" required onChange={e => this.register.password = e.target.value}></input>

                            <label>Repeat Password</label>
                            <input className="form-input" type="password" placeholder="Password" required onChange={e => this.register.password_r = e.target.value}></input>

                            <button className="login-button" type="submit">Register</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}