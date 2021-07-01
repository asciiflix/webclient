import React, { Component } from 'react'
import { match } from 'react-router';
import { JwtConext } from '../../Common/JwtContext/JwtContext';
import RecommendationBar from '../../Components/RecomendationBar/RecommendationBar';
import VideoInfo from '../../Components/VideoInfo/VideoInfo';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import Comments from '../../Components/Comments/Comments';
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
            <JwtConext.Consumer>
                {({ jwtUserInfo, changeJwt }) =>
                    <div className="video-page-container">
                        <VideoPlayer videoId={this.videoId} />
                        <VideoInfo videoId={this.videoId} jwtUserInfo={jwtUserInfo} />
                        <Comments videoId={this.videoId} jwtUserInfo={jwtUserInfo} />
                        <RecommendationBar />
                    </div>
                }
            </JwtConext.Consumer>
        )
    }
}