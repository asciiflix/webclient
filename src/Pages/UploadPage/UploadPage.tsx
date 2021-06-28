import { Component } from "react";
import { Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import UploadGIF from "../../Components/Upload/UploadGIF";

export default class UploadPage extends Component {
    render() {
        return (
            <JwtConext.Consumer>
                {({ jwtUserInfo, changeJwt }) =>
                    jwtUserInfo.jwtToken === "" ? <Redirect to="/" /> : <UploadGIF jwtUserInfo={jwtUserInfo} changeJwt={changeJwt} />
                }
            </JwtConext.Consumer>
        )
    }
}