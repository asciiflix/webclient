import React, { Component } from 'react'
import "./VideoInfo.css"
import { backendURL } from '../../Config';
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import UserMetaDataModel from "../../Models/UserMetaDataModel";
import { Link } from 'react-router-dom';



interface VideoInfoState {
    videoMetaData: VideoMetaDataModel | null,
    userMetaData: UserMetaDataModel | null,
}

interface VideoInfoProps {
    videoId: string
}

export default class VideoInfo extends Component<VideoInfoProps, VideoInfoState> {
    constructor(props: VideoInfoProps) {
        super(props);
        this.state = {
            videoMetaData: null,
            userMetaData: null,
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
                    <p className="video-metadata-like">{this.state.videoMetaData.Likes} likes</p>
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
