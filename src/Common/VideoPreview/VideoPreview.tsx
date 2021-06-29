import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserNameFromAPI } from '../Helper/UsernameApi';
import "./VideoPreview.css";

interface VideoPreviewProps {
    title: string
    creator_id: number
    uuid: string
}

interface VideoPreviewState {
    creator_name: string
}

export default class VideoPreview extends Component<VideoPreviewProps, VideoPreviewState> {

    constructor(props: VideoPreviewProps) {
        super(props);
        this.state = {
            creator_name: ""
        }
    }

    async updateCreatorName() {
        let username: string = await getUserNameFromAPI(this.props.creator_id.toString());
        if (username.length > 10) {
            username = username.slice(0, 10) + "..."
        }
        this.setState({
            creator_name: username
        });
    }

    componentDidMount() {
        this.updateCreatorName();
    }

    render() {
        return (
            <div className="video-preview-container">
                <a href={"/watch/" + this.props.uuid} className="video-preview-link"><div className="video-preview-thumbnail"></div></a>
                <p className="video-preview-title">
                    <a href={"/watch/" + this.props.uuid} className="video-preview-link">{this.props.title}</a>
                    <Link to="/user/{userName}" className="video-preview-creator"> - {this.state.creator_name}</Link>
                </p>
            </div>
        )
    }
}
