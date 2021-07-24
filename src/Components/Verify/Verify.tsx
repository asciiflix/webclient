import { Component, SyntheticEvent } from "react";
import { JwtUserInfo } from "../../Common/JwtContext/JwtContext";
import { backendURL } from "../../Config";
import "./Verify.css";

interface VerifyProps {
    jwtUserInfo: JwtUserInfo
}

interface VerifyStats {
    verified: boolean
    failed: boolean
    code: string
    send: boolean
}

export default class VerifyComp extends Component<VerifyProps, VerifyStats> {
    constructor(props: VerifyProps) {
        super(props);
        this.state = {
            verified: false,
            failed: false,
            send: false,
            code: ""
        };
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await this.verifyAccount();
    }

    sendCode = async () => {
        await this.sendCodeToAPI();
    }

    async verifyAccount() {
        let httpCode: number = 0;
        await fetch(backendURL + '/secure/user/verify?code=' + this.state.code, {
            method: "PUT",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then((response: Response) => {
                httpCode = response.status;
            });
        if (httpCode === 200) {
            this.setState({
                verified: true,
                failed: false
            });
        } else {
            this.setState({
                failed: true
            })
        }
    }

    async sendCodeToAPI() {
        let httpCode: number = 0;
        console.log(this.props.jwtUserInfo.jwtToken)
        await fetch(backendURL + '/secure/user/sendCode', {
            method: "POST",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then((response: Response) => {
                httpCode = response.status;
            });
        if (httpCode === 200) {
            this.setState({
                send: true
            });
        } else {
            this.setState({
                send: false
            })
        }
    }

    render() {
        return (
            <div className="login-form-container">
                <h1 className="form-title-text">Verify your Account</h1>
                <div className="empty-div-settings">
                    <form onSubmit={this.submit}>
                        {this.state.verified ? <p className="form-settings-successfully">Verification was successfully!</p> : <></>}
                        {this.state.send ? <p className="form-settings-successfully">Verification Code has been sent!</p> : <></>}
                        {this.state.failed ? <p className="login-form-failed-login">Verification Failed!</p> : <></>}
                        <label className="form-label-text">Verification Code</label>
                        <input className="form-input" type="name" placeholder="ee32a526-2012-42db-ab6d-9b3177161fdd" onChange={e => this.setState({ code: e.target.value })}></input>
                        <button className="login-button" type="submit">Verify</button>
                    </form>
                    <button className="code-button" onClick={this.sendCode}>Send me a Verification Code</button>
                </div>
            </div>
        )
    }
}