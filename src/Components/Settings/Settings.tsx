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

export default class Settings extends Component {
    static contextType = UserContext;

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
    }

    submit_accSecret = (e: SyntheticEvent) => {
        e.preventDefault();
        //Acc Infos submit
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

                        <button className="login-button" type="submit">Change Password</button>
                    </form>

                    <h2>Danger Zone</h2>
                    <form className="settings-grid">
                        <label className="form-label-text">Delete Account:</label>
                        <button className="login-button" type="submit">Delete Account</button>
                    </form>
                </div>
            </div>
        )
    }
}