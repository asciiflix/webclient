import React, { Component } from 'react'
import "./VideoInfo.css"
import { backendURL } from '../../Config';
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import UserMetaDataModel from "../../Models/UserMetaDataModel";
import { JwtUserInfo } from '../../Common/JwtContext/JwtContext';
import LikeIcon from "./like_icon_liked.svg";
import jwt_decode from '../../Common/Helper/JwtDecoder';
import UserModelPrivate from '../../Models/UserModelPrivate';



interface VideoInfoState {
    videoMetaData: VideoMetaDataModel | null,
    userMetaData: UserMetaDataModel | null,
    liked: boolean;
    like_fail: boolean;
}

interface VideoInfoProps {
    videoId: string
    jwtUserInfo: JwtUserInfo
}

export default class VideoInfo extends Component<VideoInfoProps, VideoInfoState> {
    constructor(props: VideoInfoProps) {
        super(props);
        this.state = {
            videoMetaData: null,
            userMetaData: null,
            liked: false,
            like_fail: false
        };
    }
    componentDidMount = () => {
        this.fetchDataFromApi();
        this.getLike();
    }

    async fetchDataFromApi() {
        let httpCode: number = 0;
        let videoDataFetched: VideoMetaDataModel | null = null;
        await fetch(backendURL + '/video/getVideo?id=' + this.props.videoId)
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                videoDataFetched = json as VideoMetaDataModel;
            })
            .catch(e => {
                videoDataFetched = null;
            });
        if (httpCode === 200) {
            this.setState({
                videoMetaData: videoDataFetched,
            });
            let userDataFetched: UserMetaDataModel | null = null;
            await fetch(backendURL + '/user/getUser?id=' + this.state.videoMetaData?.UserID)
                .then((response: Response) => {
                    httpCode = response.status;
                    return response.json();
                })
                .then((json) => {
                    userDataFetched = json as UserMetaDataModel;
                })
                .catch(e => {
                    userDataFetched = null;
                });
            if (httpCode === 200) {
                this.setState({
                    userMetaData: userDataFetched,
                })
            }
        }
    }

    async getLike() {
        let httpCode: number = 0;
        let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken)["User_ID"];
        let user: UserModelPrivate = {};
        await fetch(backendURL + "/secure/user/getUser?id=" + userID, {
            method: "GET",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            })
            .then(json => user = json as UserModelPrivate);
        if (httpCode === 200) {
            console.log(user);
            //this.setState({ liked: true });
        }
    }

    async like() {
        let httpCode: number = 0;
        await fetch(backendURL + "/secure/video/createLike?id=" + this.state.videoMetaData?.UUID, {
            method: "POST",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 201) {
            this.setState({ liked: true });

        } if (httpCode === 400) {
            this.setState({ liked: true });
        } else {
            this.setState({ like_fail: true });
        }
    }

    async removeLike() {
        let httpCode: number = 0;
        await fetch(backendURL + "/secure/video/deleteLike?id=" + this.state.videoMetaData?.UUID, {
            method: "POST",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 200) {
            this.setState({ liked: false });
        } else {
            this.setState({ like_fail: true });
        }
    }

    handleLike() {
        if (this.props.jwtUserInfo.jwtToken !== "") {
            if (this.state.liked) {
                this.removeLike();
            } else {
                this.like();
            }
        }
    }

    render() {
        if (this.state.videoMetaData === null) {
            return <p>Could not get video data.</p>
        } else if (this.state.userMetaData === null) {
            return <p>Could not get user data</p>
        }
        return (
            <div className="video-info-container">
                <h1 className="video-info-title">{this.state.videoMetaData.Title}</h1>
                <div className="video-metadata-container">
                    <p className="video-metadata-info">{this.state.videoMetaData.Views} views - {new Date(this.state.videoMetaData.UploadDate).toDateString()}</p>
                    <p className="video-metadata-like">{this.state.videoMetaData.Likes} likes </p>
                    {this.props.jwtUserInfo.jwtToken !== "" ?
                        <button className="like-icon" onClick={this.handleLike}>
                            <img src={LikeIcon} alt="Like"></img>
                        </button>
                        : <></>}

                </div>
                <hr />
                <div className="video-description-container">
                    <p className="video-description-author">by {this.state.userMetaData.Name} </p>
                    <p className="video-description-data">{this.state.videoMetaData.Description}</p>
                </div>
                <hr />
            </div>
        )
    }
}
