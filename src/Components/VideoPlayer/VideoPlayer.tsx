import React, { Component } from 'react'
import { backendURL } from '../../Config';
import VideoData from '../../Models/VideoModel'
import "./VideoPlayer.css"

const UNLOADED_VIDEO: VideoData | null = null;
const INVALID_VIDEO: VideoData | null = {Frames: []};

interface VideoPlayerProps {
    videoId: string
}

interface VideoPlayerState {
    frameIndex: number
    video: VideoData | null
    isPlaying: boolean
}

interface VideoDataWapper {
    content: {Video: VideoData}
    message: string
}

export default class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {
    timerId: any = null;
    canStartPlaying: boolean = false;

    constructor(props : VideoPlayerProps) {
        super(props);
        this.state = {
            frameIndex: 0,
            video: UNLOADED_VIDEO,
            isPlaying: false
        };
    }
    componentDidMount = () => {
        this.fetchVideoFromApi();
    }

    componentWillUnmount = () => {
        this.stopPlaying();
    }

    stopPlaying = () => {
        clearInterval(this.timerId)
        this.setState({
            isPlaying: false
        });
    }

    startPlaying = () => {
        this.timerId = setInterval(this.increaseFrame, 1);
        this.setState({
            isPlaying: true
        });
    }

    increaseFrame = () => {
        if (this.state.video === null || this.state.video === INVALID_VIDEO) {
        } else {
            // reset frames if over the limit
            if (this.state.frameIndex > this.state.video.Frames.length - 2) {
                this.setState({
                    frameIndex: 0
                });
            } else {
                this.setState((state, props) => ({
                    frameIndex: state.frameIndex + 1
                }));
            }
        }
    }

    async fetchVideoFromApi() {
        let httpCode:number = 0;
        let videoDataFetched: VideoData | null = UNLOADED_VIDEO;
        await fetch(backendURL + '/video/getContent?id=' + this.props.videoId)
        .then((response: Response) => {
            httpCode = response.status;
            return response.json();
        })
        .then((json) => {
            let apiData: VideoDataWapper = json as VideoDataWapper;
            videoDataFetched = apiData.content.Video;
        }).catch( e => {
            videoDataFetched = INVALID_VIDEO;
        });
        if (httpCode === 0) {
            this.setState({
                video: UNLOADED_VIDEO
            });
        } else if (httpCode === 200) {
            this.setState({
                video: videoDataFetched
            });
        } else if (httpCode === 400 || httpCode === 404) {
            this.setState({
                video: INVALID_VIDEO
            });
        } else {
            this.setState({
                video: INVALID_VIDEO
            });
        }
    }

    render() {
        if (this.state.video === null) {
            return <p>Video loading...</p>
        }
        if (this.state.video === INVALID_VIDEO) {
            return <p>INVALID video ID</p>
        }
        this.canStartPlaying = true;
        return (
            <div className="video-player-frame">
                {this.state.video.Frames[this.state.frameIndex].Rows.map((row, index) => 
                        <pre className="video-player-row" key={index}>{row}</pre>
                    )
                }  
                <p>{this.state.frameIndex}</p> 
                <button key={this.state.isPlaying as unknown as number} onClick={this.state.isPlaying?this.stopPlaying:this.startPlaying}>{this.state.isPlaying? "Pause" : "Play"}</button>   
            </div>
        );
    }
}

