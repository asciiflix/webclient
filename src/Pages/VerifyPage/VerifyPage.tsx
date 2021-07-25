import { Component } from "react";
import { Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import VerifyComp from "../../Components/Verify/Verify";

export default class VerifyPage extends Component {
    render() {
        return (
            <JwtConext.Consumer>
                {({ jwtUserInfo, changeJwt }) =>
                    jwtUserInfo.jwtToken === "" ? <Redirect to="/" /> :
                        <div>
                            <br></br> <VerifyComp jwtUserInfo={jwtUserInfo} />
                        </div>
                }
            </JwtConext.Consumer>
        )
    }
}