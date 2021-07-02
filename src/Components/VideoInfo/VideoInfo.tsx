import React, { Component } from 'react';
import jwt_decode from '../../Common/Helper/JwtDecoder';
import { JwtUserInfo } from '../../Common/JwtContext/JwtContext';
import { backendURL } from '../../Config';
import UserMetaDataModel from "../../Models/UserMetaDataModel";
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import LikeIconLiked from "./like_icon_liked.svg";
import LikeIconNormal from "./like_icon_normal.svg";
import EditIcon from "./edit_icon.svg";
import "./VideoInfo.css";
import { Redirect, Link } from 'react-router-dom';



interface VideoInfoState {
    videoMetaData: VideoMetaDataModel | null,
    userMetaData: UserMetaDataModel | null,
    liked: boolean;
    like_fail: boolean;
    isCreator: boolean;
    editMode: boolean;
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
            like_fail: false,
            isCreator: false,
            editMode: false
        };
    }
    componentDidMount = () => {
        this.fetchDataFromApi();
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
            if (this.props.jwtUserInfo.jwtToken !== "") {
                this.getLike();
            }
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
                });
                if (this.props.jwtUserInfo.jwtToken !== "") {
                    this.isCreator();
                }
            }
        }
    }

    async getLike() {
        let httpCode: number = 0;
        let liked: boolean = false;
        await fetch(backendURL + "/secure/video/getLike?id=" + this.state.videoMetaData?.UUID, {
            method: "GET",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            })
            .then(json => liked = json.likedStatus);
        if (httpCode === 302) {
            this.setState({ liked: liked });
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
            this.fetchDataFromApi();

        } if (httpCode === 400) {
            this.setState({ liked: true });
        } else {
            this.setState({ like_fail: true });
        }
    }

    async removeLike() {
        let httpCode: number = 0;
        await fetch(backendURL + "/secure/video/deleteLike?id=" + this.state.videoMetaData?.UUID, {
            method: "DELETE",
            headers: { "Token": this.props.jwtUserInfo.jwtToken }
        })
            .then(response => {
                httpCode = response.status;
            });
        if (httpCode === 200) {
            this.setState({ liked: false });
            this.fetchDataFromApi();
        } else {
            this.setState({ like_fail: true });
        }
    }

    isCreator = () => {
        if (this.props.jwtUserInfo.jwtToken !== "") {
            let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken)["User_ID"].toString();
            let compUserID: string = this.state.videoMetaData?.UserID.toString() as string;
            if (userID === compUserID) {
                this.setState({ isCreator: true });
            }
        }
    }

    handleLike = () => {
        if (this.props.jwtUserInfo.jwtToken !== "") {
            if (this.state.liked) {
                this.removeLike();
            } else {
                this.like();
            }
        }
    }

    handleEdit = () => {
        this.setState({ editMode: true });
    }

    render() {
        if (this.state.videoMetaData === null) {
            return <p>Could not get video data.</p>
        } else if (this.state.userMetaData === null) {
            return <p>Could not get user data</p>
        }
        return (
            <div className="video-info-container">
                {this.state.editMode ? <Redirect to={"/edit/" + this.state.videoMetaData.UUID}></Redirect> : <></>}
                <h1 className="video-info-title">{this.state.videoMetaData.Title}</h1>
                <div className="video-metadata-container">
                    <p className="video-metadata-info">{this.state.videoMetaData.Views} views - {this.state.videoMetaData.Likes} likes - {new Date(this.state.videoMetaData.UploadDate).toDateString()}</p>
                    <p className="video-metadata-like"> </p>
                    {this.props.jwtUserInfo.jwtToken !== "" ?
                        <button className="edit-icon" onClick={this.handleEdit}>
                            {this.state.isCreator ? <img src={EditIcon} alt="Edit"></img> : <></>}
                        </button>
                        : <></>}
                    {this.props.jwtUserInfo.jwtToken !== "" ?
                        <button className="like-icon" onClick={this.handleLike}>
                            {this.state.liked ? <img src={LikeIconLiked} alt="Like"></img> : <img src={LikeIconNormal} alt="Like"></img>}
                        </button> : <></>}
                </div>
                <hr />
                <div className="video-description-container">
                    <Link to={"/user/" + this.state.userMetaData.UserID} className="video-author-link">
                        <p className="video-author-link">by {this.state.userMetaData.Name} </p>
                    </Link>
                    <p className="video-description-data">{this.state.videoMetaData.Description}</p>
                </div>
                <hr />
            </div>
        )
    }
}
