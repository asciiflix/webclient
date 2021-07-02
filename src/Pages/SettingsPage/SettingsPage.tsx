import { Component } from "react";
import { Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import Settings from "../../Components/Settings/Settings";
import "./SettingsPage.css";


export default class SettingsPage extends Component {

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