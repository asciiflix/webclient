import { Component } from "react";
import { Redirect } from "react-router-dom";
import Settings from "../../Components/Settings/Settings";
import { EMPTY_USER_CONTEXT, UserContext } from "../../UserContext";

import "./SettingsPage.css";

export default class SettingsPage extends Component {
    static contextType = UserContext;

    getUserState = () => {
        if (this.context === EMPTY_USER_CONTEXT || this.context.jwtToken === "") {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div className="settings-page-container">
                {this.getUserState() ? <Redirect to="/"></Redirect> : <br></br>}
                <Settings></Settings>
            </div>
        )
    }
}