import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./VideoPreview.css"

interface VideoPreviewProps {
    title: string
    creator: string
    uuid: string
}

export default class VideoPreview extends Component<VideoPreviewProps> {
    render() {
        return (
            <Link to={"/watch/" + this.props.uuid} className="video-preview-link">
                <div className="video-preview-container">
                    <div className="video-preview-thumbnail"></div>
                    <p className="video-preview-title">{this.props.title}  - <Link to="/user/{userName}" className="video-preview-creator"> {this.props.creator}</Link></p>
                </div>
            </Link>
        )
    }
}
