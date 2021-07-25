import { Component, SyntheticEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { backendURL } from "../../Config";
import { UserContext } from '../../UserContext';
import "./UserLogin.css";

interface UserLoginStatusProps {
    isLoggedIn: boolean
    changeJwt: Function
}

interface UserLoginState {
    isLoggedIn: boolean
    hasFailedLogin: boolean
    jwtToken: string
}

interface LoginInformation {
    email: string
    password: string
}

export default class UserLogin extends Component<UserLoginStatusProps, UserLoginState> {
    static contextType = UserContext;
    login: LoginInformation = {
        email: "",
        password: ""
    };

    constructor(props: UserLoginStatusProps) {
        super(props);
        this.state = {
            isLoggedIn: false,
            hasFailedLogin: false,
            jwtToken: "",
        };
    }

    //Submit Handler
    submit_login = async (e: SyntheticEvent) => {
        e.preventDefault();
        await this.loginCallApi();
    }

    //Login Request to the backend: Post Request to get the jwt-token -> user-login
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
            //Stores the JWT-Token
            this.props.changeJwt(userJWTToken);
            this.setState({isLoggedIn: true, jwtToken: userJWTToken});
        } else {
            this.setState({ hasFailedLogin: true })
        }
    }

    render() {
        return (
            <div className="login-form-container">
                {this.state.isLoggedIn ? <Redirect to="/"></Redirect>:
                    <form onSubmit={this.submit_login}>
                        <div className="empty-div">
                            <h1 className="form-title-text">Login</h1>
                            {this.state.hasFailedLogin ? <p className="login-form-failed-login">Login Failed, please try again</p> : <></>}
                            <label className="form-label-text">Email</label>
                            <input className="form-input" type="email" placeholder="E-Mail" required onChange={e => this.login.email = e.target.value}></input>

                            <label className="form-label-text">Password</label>
                            <input className="form-input" type="password" placeholder="Password" required onChange={e => this.login.password = e.target.value}></input>

                            <Link className="text" to="/register">Register</Link>
                            <button className="login-button" type="submit">Login</button>
                        </div>
                    </form>}
            </div>
        )
    }
}