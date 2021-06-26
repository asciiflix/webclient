import { Component } from "react";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import "./LogoutPage.css"

export default class Logout extends Component {

    setParentContextState: Function = () => {};

    logout = (updateForRemoval: Function) => {
        this.setParentContextState = updateForRemoval
        if (localStorage.getItem('jwt') !== null) {
            localStorage.removeItem("jwt");
        }
        return <h1 className="logout-message">You have been successfully logged out...</h1>
    }

    componentDidMount() {
        this.setParentContextState("");
    }

    render() {
        return (
            <JwtConext.Consumer>
                {({jwtUserInfo, changeJwt}) => 
                    this.logout(changeJwt)
                }
            </JwtConext.Consumer>
        )
    }
}