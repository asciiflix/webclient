import { Component } from "react";
import { UserContext } from "../../UserContext";


export default class Logout extends Component {
    static contextType = UserContext;

    logout = () => {
        if (this.context === null) {
            return <h1>Not Logged In</h1>
        } else {
            localStorage.removeItem("jwt");
            this.context = null;
            return <h1>User Logged Out!</h1>
        }
    }

    render() {
        return (
            this.logout()
        )
    }
}