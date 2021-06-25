import React, { Component } from 'react'
import { match } from 'react-router';
import RecommendationBar from '../../Components/RecomendationBar/RecommendationBar';
import VideoInfo from '../../Components/VideoInfo/VideoInfo';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import "./VideoPage.css"

interface VideoPageProps {
    match: match<any>
}

export default class VideoPage extends Component<VideoPageProps> {
    videoId: string;

    constructor(props: VideoPageProps) {
        super(props);
        this.videoId = this.props.match.params.videoId;
    }

    render() {
        return (
            <div className="video-page-container">
                <VideoPlayer videoId={this.videoId} />
                <VideoInfo videoId={this.videoId} />
                <RecommendationBar/>
            </div>
        )
    }
}