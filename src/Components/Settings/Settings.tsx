import { Component, SyntheticEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import jwt_decode from "../../Common/Helper/JwtDecoder";
import { JwtUserInfo } from "../../Common/JwtContext/JwtContext";
import { backendURL } from "../../Config";
import UserModelPrivate from "../../Models/UserModelPrivate";
import { UserContext } from "../../UserContext";
import "../Login/UserLogin.css";
import "../Upload/UploadGIF.css";
import "./Settings.css";

interface AccountInformation {
    username: string
    description: string
    email: string
}

interface AccountSecrets {
    currentPW: string
    newPW: string
    newPWRepeat: string
}

interface StatusProps {
    jwtUserInfo: JwtUserInfo
    changeJwt: Function
}

interface StatusState {
    PWWrong: boolean
    PWFailed: boolean
    PWChanged: boolean
    NameChanged: boolean
    MailWrong: boolean
    MailChanged: boolean
    DescChanged: boolean
    AccountDeleted: boolean
    CurrenUserData: UserModelPrivate;
}


export default class Settings extends Component<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);
        this.state = {
            PWWrong: false,
            PWFailed: false,
            PWChanged: false,
            NameChanged: false,
            MailWrong: false,
            MailChanged: false,
            DescChanged: false,
            AccountDeleted: false,
            CurrenUserData: {}
        };
    }

    //Interface to store form data (account-info)
    accountInformation: AccountInformation = {
        username: "",
        description: "",
        email: ""
    };

    //Interface to store form data (account-secrets)
    accountSecret: AccountSecrets = {
        currentPW: "",
        newPW: "",
        newPWRepeat: ""
    };

    //Get "Private" User Information from the backend (username, email, desc)
    async getPrivateUserInformation() {
        let httpCode: number = 0;
        let userData: UserModelPrivate = {};
        let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken).User_ID;
        await fetch(backendURL + "/secure/user/getUser?id=" + userID, {
            method: "GET",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
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

    //Put Request to Update Account-Information at the backend
    async changeAccountInformation() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken).User_ID;
        await fetch(backendURL + "/secure/user/updateUser?id=" + userID, {
            method: "PUT",
            headers: { "Token": this.props.jwtUserInfo.jwtToken, "Content-Type": "application/json" },
            body: JSON.stringify({
                "Name": this.accountInformation.username,
                "Description": this.accountInformation.description,
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
            if (this.accountInformation.description !== "") {
                this.setState({
                    DescChanged: true
                });
            }
        } else if (httpCode === 409) {
            this.setState({ MailWrong: true });
        }
    }

    //Put Request to change the pw at the backend
    async changePassword() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken).User_ID;
        await fetch(backendURL + "/secure/user/updateUser?id=" + userID, {
            method: "PUT",
            headers: { "Token": this.props.jwtUserInfo.jwtToken, "Content-Type": "application/json" },
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

    //Checks if the entered password is the correct password
    async checkCurrentPassword() {
        let httpCode: number = 0;
        let email: string = jwt_decode(this.props.jwtUserInfo.jwtToken)["User_email"];
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

    //Delete Request to delete the account at the backend
    async deleteAccount() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken)["User_ID"];
        await fetch(backendURL + "/secure/user/deleteUser?id=" + userID, {
            method: "DELETE",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
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

    //Submit Handler for Account Information
    submit_accInfos = (e: SyntheticEvent) => {
        e.preventDefault();
        this.changeAccountInformation();
    }

    //Submit Handler for Account Secrets (PW)
    submit_accSecret = (e: SyntheticEvent) => {
        e.preventDefault();
        //Check if current password is correct, then change it.
        this.checkCurrentPassword();
    }

    //Submit Handler to Delete the Account
    submit_deleteAcc = (e: SyntheticEvent) => {
        e.preventDefault();
        this.deleteAccount();
    }


    //After Name change, set new name for the jwt handler
    finalizeNameChange = () => {
        this.props.changeJwt(this.props.jwtUserInfo.jwtToken);
        return <Redirect to="/"></Redirect>;
    }


    //On Mount load User Information
    componentDidMount() {
        if (this.props.jwtUserInfo.jwtToken !== "") {
            this.getPrivateUserInformation();
        }
    }

    render() {
        return (
            <div className="settings-form-container">
                <div className="empty-div-settings">
                    <h1 className="form-title-text">Settings</h1>
                    <h2 className="form-title-text">Change Account Information</h2>
                    {this.state.MailChanged ? <Redirect to="/logout"></Redirect> : <></>}
                    {this.state.DescChanged ? <p className="form-settings-successfully">Description Successfully Changed!</p> : <></>}
                    {this.state.MailWrong ? <p className="login-form-failed-login">E-Mail is already taken!</p> : <></>}
                    <form className="settings-grid" onSubmit={this.submit_accInfos}>
                        <label className="form-label-text">Username:</label>
                        <input className="form-input" type="name" placeholder={this.state.CurrenUserData.Name} onChange={e => this.accountInformation.username = e.target.value}></input>
                        <label className="form-label-text">Description:</label>
                        <textarea className="upload-input-desc" placeholder={this.state.CurrenUserData.Description} onChange={e => this.accountInformation.description = e.target.value}></textarea>
                        <label className="form-label-text">E-Mail:</label>
                        <input className="form-input" type="email" placeholder={this.state.CurrenUserData.Email} onChange={e => this.accountInformation.email = e.target.value}></input>
                        <Link className="verify-link" to={"/verify"}>Verify your Account here!</Link>
                        {this.state.NameChanged ?
                            <UserContext.Consumer>
                                {({ jwtToken, username, setUsername, setJwtToken, rerender }) => (
                                    this.state.NameChanged ? this.finalizeNameChange() : <></>)}
                            </UserContext.Consumer> : <></>}

                        <button className="login-button" type="submit">Apply Changes</button>
                    </form>

                    <h2 className="form-title-text">Change Secrets</h2>
                    {this.state.PWWrong ? <p className="login-form-failed-login">Current Password did not match</p> : <></>}
                    {this.state.PWFailed ? <p className="login-form-failed-login">New Password does not match</p> : <></>}
                    {this.state.PWChanged ? <p className="form-settings-successfully">Password Successfully Changed <Redirect to="/logout"></Redirect></p> : <></>}
                    <form className="settings-grid" onSubmit={this.submit_accSecret}>
                        <label className="form-label-text">Current Password:</label>
                        <input className="form-input" type="password" placeholder="**********" onChange={e => this.accountSecret.currentPW = e.target.value}></input>
                        <label className="form-label-text">New Password:</label>
                        <input className="form-input" type="password" placeholder="**********" onChange={e => this.accountSecret.newPW = e.target.value}></input>
                        <label className="form-label-text">Repeat New Password:</label>
                        <input className="form-input" type="password" placeholder="**********" onChange={e => this.accountSecret.newPWRepeat = e.target.value}></input>
                        <button className="login-button" type="submit">Change Password</button>
                    </form>

                    <h2 className="form-title-text">Danger Zone</h2>
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