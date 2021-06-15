import React, { Component } from 'react'
import { match } from 'react-router';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';

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
            <div>
                <VideoPlayer videoId={this.videoId}/>
            </div>
        )
    }
}