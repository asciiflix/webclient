import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UNLOADED_VIDEO } from '../../Components/VideoPlayer/VideoPlayer';
import { backendURL } from '../../Config';
import VideoData from '../../Models/VideoModel';
import { getUserNameFromAPI } from '../Helper/UsernameApi';
import shortCreatorName from '../Helper/UserNameShorter';
import "./VideoPreview.css";

interface VideoPreviewProps {
    title: string
    creator_id: number
    uuid: string
}

interface VideoPreviewState {
    creator_name: string
    video: VideoData | null
}

interface VideoDataWrapper {
    content: { Video: VideoData }
    message: string
}

export default class VideoPreview extends Component<VideoPreviewProps, VideoPreviewState> {

    constructor(props: VideoPreviewProps) {
        super(props);
        this.state = {
            creator_name: "",
            video: null
        }
    }

    async updateCreatorName() {
        let username: string = await getUserNameFromAPI(this.props.creator_id.toString());
        username = shortCreatorName(username);
        this.setState({
            creator_name: username
        });
    }

    componentDidMount() {
        this.updateCreatorName();
        this.fetchVideoFromApi();
    }

    async fetchVideoFromApi() {
        let httpCode: number = 0;
        let videoDataFetched: VideoData | null = UNLOADED_VIDEO;
        await fetch(backendURL + '/video/getContent?id=' + this.props.uuid)
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                let apiData: VideoDataWrapper = json as VideoDataWrapper;
                videoDataFetched = apiData.content.Video;
            }).catch(e => {
                videoDataFetched = null;
            });
        if (httpCode === 200) {
            this.setState({
                video: videoDataFetched
            });
        }
    }

    render() {
        return (
            <div className="video-preview-container">
                <a href={"/watch/" + this.props.uuid} className="video-preview-link">
                    <div className="video-preview-thumbnail">
                        {this.state.video !== null ?
                            <div className="video-thumbnail-content">
                                {this.state.video.Frames[0].Rows.map((row, index) =>
                                    <pre className="video-player-row" key={index}>{row}</pre>
                                )
                                }
                            </div> : <></>}
                    </div>
                </a>
                <p className="video-preview-title">
                    <a href={"/watch/" + this.props.uuid} className="video-preview-link">{this.props.title}</a>
                    <Link to={"/user/" + this.props.creator_id} className="video-preview-creator"> - {this.state.creator_name}</Link>
                </p>
            </div>
        )
    }
}
