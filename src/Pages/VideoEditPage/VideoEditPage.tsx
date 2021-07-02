import { Component } from "react";
import { match, Redirect } from "react-router-dom";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import VideoEdit from "../../Components/VideoEdit/VideoEdit";

interface EditPageProps {
    match: match<any>
}

interface EditPageState {
}

export default class VideoEditPage extends Component<EditPageProps, EditPageState> {
    videoID: string;

    constructor(props: EditPageProps) {
        super(props);
        this.videoID = this.props.match.params.videoId;

    }

    render() {
        return (
            <JwtConext.Consumer>
                {({ jwtUserInfo, changeJwt }) =>
                    jwtUserInfo.jwtToken === "" ? <Redirect to="/" /> : <VideoEdit jwtUserInfo={jwtUserInfo} videoID={this.videoID} />
                }
            </JwtConext.Consumer>
        )
    }

}