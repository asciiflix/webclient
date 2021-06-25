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
            creator_name: "",
        }
    }

    async updateCreatorName() {
        let username: string = await getUserNameFromAPI(this.props.creator_id.toString());
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
                <Link to={"/watch/" + this.props.uuid} onClick={() => window.location.reload()} className="video-preview-link"><div className="video-preview-thumbnail"></div></Link>
                <p className="video-preview-title"><Link to={"/watch/" + this.props.uuid} onClick={() => window.location.reload()} className="video-preview-link">{this.props.title}</Link> <Link to="/user/{userName}" className="video-preview-creator">- {this.state.creator_name}</Link></p>
            </div>
        )
    }
}
