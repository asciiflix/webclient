import React, { Component } from 'react';
import shortCreatorName from '../../Common/Helper/UserNameShorter';
import VideoPreview from '../../Common/VideoPreview/VideoPreview';
import { backendURL } from '../../Config';
import UserMetaDataModel from '../../Models/UserMetaDataModel';
import "./UserProfile.css";

interface UserProfilePageProps {
    userID: string

}

interface UserProfilePageState {
    userMetaData: UserMetaDataModel | null,
}

export default class UserProfile extends Component<UserProfilePageProps, UserProfilePageState> {
    userId: string;

    constructor(props: UserProfilePageProps) {
        super(props);
        this.userId = this.props.userID;

        this.state = {
            userMetaData: null,
        }
    }

    //Get User Data
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
                fetchedUserData.Name = shortCreatorName(fetchedUserData.Name, 14);
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

    //On load, get User-Data
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
                            {this.state.userMetaData.Videos !== null ? this.state.userMetaData.Videos.map((video, index) => <VideoPreview key={index} title={video.Title} uuid={video.UUID} creator_id={video.UserID}></VideoPreview>): <p>User has no videos.</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}