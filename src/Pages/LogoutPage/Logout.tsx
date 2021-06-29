import { Component } from "react";
import { clearJwtToken, clearUnameToken, JwtConext } from "../../Common/JwtContext/JwtContext";
import { backendURL } from "../../Config";
import "./LogoutPage.css"

export default class Logout extends Component {

    setParentContextState: Function = () => { };

    logout = () => {
        if (localStorage.getItem('jwt') !== null) {
            clearUnameToken();
            clearJwtToken();
        }
        return <h1 className="logout-message">You have been successfully logged out...</h1>
    }

    async logoutFromAPI(jwt: string) {
        await fetch(backendURL + "/secure/logout", {
            method: "GET",
            headers: { "Token": jwt }
        });
    }

    componentDidMount() {
        this.setParentContextState("");
    }

    render() {
        return (
            <JwtConext.Consumer>
                {({ jwtUserInfo, changeJwt }) => {
                    this.setParentContextState = changeJwt;
                    this.logoutFromAPI(jwtUserInfo.jwtToken);
                    return this.logout()
                }}
            </JwtConext.Consumer>
        )
    }
}