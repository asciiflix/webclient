import { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "../../Common/Helper/JwtDecoder";
import { backendURL } from "../../Config";
import UserModelPrivate from "../../Models/UserModelPrivate";
import { UserContext } from "../../UserContext";
import "../Login/UserLogin.css";
import "./Settings.css";

interface AccountInformation {
    username: string
    email: string
}

interface AccountSecrets {
    currentPW: string
    newPW: string
    newPWRepeat: string
}

interface StatusProps {

}

interface StatusState {
    PWWrong: boolean
    PWFailed: boolean
    PWChanged: boolean
    NameChanged: boolean
    MailChanged: boolean
    AccountDeleted: boolean
    CurrenUserData: UserModelPrivate;
}


export default class Settings extends Component<StatusProps, StatusState> {
    static contextType = UserContext;

    constructor(props: StatusProps) {
        super(props);
        this.state = {
            PWWrong: false,
            PWFailed: false,
            PWChanged: false,
            NameChanged: false,
            MailChanged: false,
            AccountDeleted: false,
            CurrenUserData: {}
        };
    }

    accountInformation: AccountInformation = {
        username: "",
        email: ""
    };

    accountSecret: AccountSecrets = {
        currentPW: "",
        newPW: "",
        newPWRepeat: ""
    };

    async getPrivateUserInformation() {
        let httpCode: number = 0;
        let userData: UserModelPrivate = {};
        let userID: string = jwt_decode(this.context.jwtToken).User_ID;
        await fetch(backendURL + "/secure/user/getUser?id=" + userID, {
            method: "GET",
            headers: { "Token": this.context.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            })
            .then(json => {
                userData = json as UserModelPrivate;
            });
        if (httpCode === 200) {
            this.setState({
                CurrenUserData: userData
            });
        }
    }

    async changeAccountInformation() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.context.jwtToken).User_ID;
        await fetch(backendURL + "/secure/user/updateUser?id=" + userID, {
            method: "PUT",
            headers: { "Token": this.context.jwtToken, "Content-Type": "application/json" },
            body: JSON.stringify({
                "Name": this.accountInformation.username,
                "EMail": this.accountInformation.email
            })
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 202) {
            if (this.accountInformation.username !== "") {
                this.setState({
                    NameChanged: true
                });
            }
            if (this.accountInformation.email !== "") {
                this.setState({
                    MailChanged: true
                });
            }

        }
    }

    async changePassword() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.context.jwtToken).User_ID;
        await fetch(backendURL + "/secure/user/updateUser?id=" + userID, {
            method: "PUT",
            headers: { "Token": this.context.jwtToken, "Content-Type": "application/json" },
            body: JSON.stringify({
                "Password": this.accountSecret.newPWRepeat
            })
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 202) {
            this.setState({
                PWChanged: true
            });
        }
    }

    async checkCurrentPassword() {
        let httpCode: number = 0;
        let email: string = jwt_decode(this.context.jwtToken)["User_email"];
        await fetch(backendURL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": email,
                "password": this.accountSecret.currentPW
            })
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 200) {
            this.setState({ PWWrong: false });
            //Compare Passwords
            if (this.accountSecret.newPW === this.accountSecret.newPWRepeat) {
                this.changePassword();
            } else {
                this.setState({ PWFailed: true });
            }
        } else {
            this.setState({ PWWrong: true });
        }
    }

    async deleteAccount() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.context.jwtToken)["User_ID"];
        await fetch(backendURL + "/secure/user/deleteUser?id=" + userID, {
            method: "DELETE",
            headers: { "Token": this.context.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 204) {
            this.setState({
                AccountDeleted: true
            });
        }
    }

    submit_accInfos = (e: SyntheticEvent) => {
        e.preventDefault();
        this.changeAccountInformation();
    }

    submit_accSecret = (e: SyntheticEvent) => {
        e.preventDefault();
        //Check if current password is correct, then change it.
        this.checkCurrentPassword();
    }

    submit_deleteAcc = (e: SyntheticEvent) => {
        e.preventDefault();
        this.deleteAccount();
    }

    finalizeNameChange = (jwtSetter: Function, usernameSetter: Function, rerender: Function) => {
        rerender(this.context.jwtToken, this.accountInformation.username);
        return <Redirect to="/"></Redirect>;
    }

    componentDidMount() {
        if (this.context.jwtToken !== "") {
            this.getPrivateUserInformation();
        }
    }

    render() {
        return (
            <div className="settings-form-container">
                <div className="empty-div-settings">
                    <h1 className="form-title-text">Settings</h1>
                    <form className="settings-grid" onSubmit={this.submit_accInfos}>
                        <h2>Change Account Information</h2>
                        <label className="form-label-text">Username:</label>
                        <input className="form-input" type="name" placeholder={this.state.CurrenUserData.Name} onChange={e => this.accountInformation.username = e.target.value}></input>
                        <label className="form-label-text">E-Mail:</label>
                        <input className="form-input" type="email" placeholder={this.state.CurrenUserData.Email} onChange={e => this.accountInformation.email = e.target.value}></input>
                        {this.state.NameChanged ?
                            <UserContext.Consumer>
                                {({ jwtToken, username, setUsername, setJwtToken, rerender }) => (
                                    this.state.NameChanged ? this.finalizeNameChange(setJwtToken, setUsername, rerender) : <></>)}
                            </UserContext.Consumer> : <></>}

                        {this.state.MailChanged ? <Redirect to="/logout"></Redirect> : <></>}
                        <button className="login-button" type="submit">Apply Changes</button>
                    </form>

                    <h2>Change Secrets</h2>
                    <form className="settings-grid" onSubmit={this.submit_accSecret}>
                        <label className="form-label-text">Current Password:</label>
                        <input className="form-input" type="password" placeholder="**********" onChange={e => this.accountSecret.currentPW = e.target.value}></input>
                        <label className="form-label-text">New Password:</label>
                        <input className="form-input" type="password" placeholder="**********" onChange={e => this.accountSecret.newPW = e.target.value}></input>
                        <label className="form-label-text">Repeat New Password:</label>
                        <input className="form-input" type="password" placeholder="**********" onChange={e => this.accountSecret.newPWRepeat = e.target.value}></input>
                        {this.state.PWWrong ? <p className="login-form-failed-login">Current Password did not match</p> : <></>}
                        {this.state.PWFailed ? <p className="login-form-failed-login">New Password does not match</p> : <></>}
                        {this.state.PWChanged ? <p className="form-settings-successfully">Password Successfully Changed <Redirect to="/logout"></Redirect></p> : <></>}
                        <button className="login-button" type="submit">Change Password</button>
                    </form>

                    <h2>Danger Zone</h2>
                    <form className="settings-grid" onSubmit={this.submit_deleteAcc}>
                        <label className="form-label-text">Delete Account:</label>
                        <button className="delete-button" type="submit">Delete Account</button>
                        {this.state.AccountDeleted ? <Redirect to="/logout"></Redirect> : <></>}
                    </form>
                </div>
            </div>
        )
    }
}