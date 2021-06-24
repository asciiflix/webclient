import React, { Component, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { backendURL } from "../../Config";
import "./UserRegistration.css";

interface RegisterInformation {
    username: string
    email: string
    password: string
}

interface Status {
    isRegistered: boolean
}

interface StatusState {
    isRegistered: boolean
}

export default class UserRegistration extends Component<Status, StatusState> {

    register: RegisterInformation = {
        username: "",
        email: "",
        password: ""
    };

    constructor(props: StatusState) {
        super(props);
        this.state = {
            isRegistered: props.isRegistered
        };
    }


    submit_register = (e: SyntheticEvent) => {
        e.preventDefault();
        this.registerCallApi();
    }


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
            })
            .then(json => console.log(json.message));
        if (httpCode === 201) {
            this.setState({ isRegistered: true })
        } else {
            console.log("Error Creating User");
        }
    }

    render() {
        return (
            <div className="register-form-container">
                {this.state.isRegistered ? <Redirect to="/login"></Redirect> :                    
                    <form onSubmit={this.submit_register}>                       
                        <div className="empty-div">
                            <h1>Register</h1>
                            <label>Username</label>
                            <input className="form-input" type="name" placeholder="Username" required onChange={e => this.register.username = e.target.value}></input>

                            <label>Email</label>
                            <input className="form-input" type="email" placeholder="E-Mail" required onChange={e => this.register.email = e.target.value}></input>

                            <label>Password</label>
                            <input className="form-input" type="password" placeholder="Password" required onChange={e => this.register.password = e.target.value}></input>

                            <button className="login-button" type="submit">Register</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}