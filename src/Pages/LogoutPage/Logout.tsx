import { Component } from "react";
import { clearJwtToken, clearUnameToken, JwtConext } from "../../Common/JwtContext/JwtContext";
import "./LogoutPage.css"

export default class Logout extends Component {

    setParentContextState: Function = () => {};

    logout = () => {
        if (localStorage.getItem('jwt') !== null) {
            clearUnameToken();
            clearJwtToken();
        }
        return <h1 className="logout-message">You have been successfully logged out...</h1>
    }

    componentDidMount() {
        this.setParentContextState("");
    }

    render() {
        return (
            <JwtConext.Consumer>
                {({jwtUserInfo, changeJwt}) => {
                    this.setParentContextState = changeJwt;
                    return this.logout()
                }}
            </JwtConext.Consumer>
        )
    }
}