import React, { Component } from 'react'
import VideoData from '../../Models/VideoModel'
import "./VideoPlayer.css"

interface VideoPlayerProps {
    video: VideoData
}

interface VideoPlayerState {
    frameIndex: number
}

export default class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {
    timerId: any;
    canStartPlaying: boolean = false;

    constructor(props : VideoPlayerProps) {
        super(props);
        this.state = {
            frameIndex: 0
        };
    }
    componentDidMount() {
        this.timerId = setInterval( () => {
            // the minus one makes no sense in my eyes, however it leads to smooth playback, so I'm not complaining
            if (this.state.frameIndex >= this.props.video.Frames.length - 1) {
                this.setState({
                    frameIndex: 0
                });
            } else if (this.canStartPlaying){
                this.setState((state, props) => ({
                    frameIndex: state.frameIndex + 1
                }));
            }
        }, 1
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        if (this.props.video.Frames[this.state.frameIndex] === undefined) {
            return <p>Video loading...</p>
        }
        this.canStartPlaying = true;
        return (
            <div className="video-player-frame">
                {
                    this.props.video.Frames[this.state.frameIndex].Rows.map((row, index) => 
                        <pre className="video-player-row" key={index}>{row}</pre>
                    )
                }  
                <p>{this.state.frameIndex}</p>    
            </div>
        )
    }
}
