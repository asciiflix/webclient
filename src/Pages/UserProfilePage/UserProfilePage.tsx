import React, { Component } from 'react'
import { match } from 'react-router';
import VideoPreview from '../../Common/VideoPreview/VideoPreview';
import { backendURL } from '../../Config';
import UserMetaDataModel from '../../Models/UserMetaDataModel';
import "./UserProfilePage.css"

interface UserProfilePageProps {
    match: match<any>

}

interface UserProfilePageState {
    userMetaData: UserMetaDataModel | null,
}

export default class VideoPage extends Component<UserProfilePageProps, UserProfilePageState> {
    userId: string;

    constructor(props: UserProfilePageProps) {
        super(props);
        this.userId = this.props.match.params.userId;

        this.state = {
            userMetaData: null,
        }
    }

    async fetchUserData() {
        let httpCode: number = 0;
        let fetchedUserData: UserMetaDataModel | null = null;
        await fetch(backendURL + "/user/getUser?id=" + this.userId)
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                fetchedUserData = json as UserMetaDataModel;

            })
            .catch(e => {
                fetchedUserData = null;
            });
        if (httpCode === 200) {
            this.setState({
                userMetaData: fetchedUserData
            });
        }
    }

    componentDidMount = () => {
        this.fetchUserData();
    }

    render() {
        if (this.state.userMetaData === null) {
            return <p>Could not get user data.</p>
        }
        return (
            <div className="user-page-container">
                <div className="user-name-container">
                    <h1>{this.state.userMetaData.Name}</h1>
                </div>
                <div className="user-metadata-container">
                    <div className="user-metadata-content">
                        <p className="user-metadata-description">{this.state.userMetaData.Description}</p>
                        <div className="user-video-container">
                            {this.state.userMetaData.Videos !== null ? this.state.userMetaData.Videos.map((video, index) => <VideoPreview title={video.Title} uuid={video.UUID} creator_id={video.UserID}></VideoPreview>): <p>User has no videos.</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}