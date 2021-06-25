import { Component, SyntheticEvent } from "react";
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
    Status: boolean
}


export default class Settings extends Component<StatusProps, StatusState> {
    static contextType = UserContext;

    constructor(props: StatusProps) {
        super(props);
        this.state = {
            PWWrong: false,
            PWFailed: false,
            Status: false
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

    submit_accInfos = (e: SyntheticEvent) => {
        e.preventDefault();
        //Acc Infos submit
        //Simple put request to user with jwt-token
    }

    submit_accSecret = (e: SyntheticEvent) => {
        e.preventDefault();
        //Acc Infos submit

        //first check if current password is correct -> test this pw with the login  func and check response
        //then compare new_pw_1 and new_pw_rp if same to put request user change, if not cancel pw not the same
    }

    submit_deleteAcc = (e: SyntheticEvent) => {
        e.preventDefault();
        //Acc Infos submit
        //just delete acc        
    }

    componentDidMount() {
        //Fetch and Insert default information!
    }

    render() {
        return (
            <div className="settings-form-container">
                <div className="empty-div-settings">
                    <h1 className="form-title-text">Settings</h1>

                    <h2>Change Account Information</h2>
                    <form className="settings-grid" onSubmit={this.submit_accInfos}>
                        <label className="form-label-text">Username:</label>
                        <input className="form-input" type="name" placeholder={this.accountInformation.username} onChange={e => this.accountInformation.username = e.target.value}></input>
                        <label className="form-label-text">E-Mail:</label>
                        <input className="form-input" type="email" placeholder={this.accountInformation.email} onChange={e => this.accountInformation.email = e.target.value}></input>
                        {this.state.Status ? <p className="form-settings-successfully">Information Successfully Changed</p> : <></>}
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
                        <button className="login-button" type="submit">Change Password</button>
                    </form>

                    <h2>Danger Zone</h2>
                    <form className="settings-grid" onSubmit={this.submit_deleteAcc}>
                        <label className="form-label-text">Delete Account:</label>
                        <button className="login-button" type="submit">Delete Account</button>
                    </form>
                </div>
            </div>
        )
    }
}