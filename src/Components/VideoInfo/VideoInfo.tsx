import React, { Component } from 'react'
import "./VideoInfo.css"

interface VideoInfoState {
    title: string
    views: string
    date: string
}

interface VideoInfoProps {
    videoId: string
}

export default class VideoInfo extends Component<VideoInfoProps, VideoInfoState> {
    constructor(props: VideoInfoProps) {
        super(props);
        this.state ={
            title: "Gehlen geht zur CIA",
            views: "0",
            date: "Dec 10, 2017"
        };
    }
    render() {
        return (
            <div className="video-info-container">
                <h1 className="video-info-title">{this.state.title}</h1>
                <p className="video-info-data">{this.state.views} views - {this.state.date}</p>
            </div>
        )
    }
}
