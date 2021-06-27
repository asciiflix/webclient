import { Component } from "react";
import { Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
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
            <JwtConext.Consumer>
                {({jwtUserInfo, changeJwt}) => 
                    jwtUserInfo.jwtToken === ""?<Redirect to="/"/> : <Settings jwtUserInfo={jwtUserInfo} changeJwt={changeJwt}/>
                }
            </JwtConext.Consumer>
        )
    }
}