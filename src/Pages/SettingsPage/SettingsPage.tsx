import { Component } from "react";
import Settings from "../../Components/Settings/Settings";

import "./SettingsPage.css";

export default class SettingsPage extends Component{
    render() {
        return (
            <div className="settings-page-container">
                <br></br>
                <Settings></Settings>
            </div>
        )
    }
}