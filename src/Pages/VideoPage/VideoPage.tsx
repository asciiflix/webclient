import React, { Component } from 'react'
import { match } from 'react-router';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import VideoData from '../../Models/VideoModel';
import {backendURL} from '../../Config';

interface VideoPageProps {
    match: match<any>
}

interface VideoPageState {
    videoData: VideoData
}

interface VideoDataWapper {
    content: {Video: VideoData}
    message: string
}

export default class VideoPage extends Component<VideoPageProps, VideoPageState> {
    videoId: string;

    constructor(props: VideoPageProps) {
        super(props);
        this.state = {
            videoData: {Frames:[]}
        };
        this.videoId = this.props.match.params.videoId;
        
    }


    componentDidMount() {
        fetch(backendURL + '/video/getContent?id=' + this.videoId)
            .then((response: Response) => response.json())
            .then((json) => {
                // TODO add error handling
                var apiData: VideoDataWapper = json as VideoDataWapper;
                if (apiData.message === "Successfully found VideoContent by ID"){
                    this.setState({
                        videoData: apiData.content.Video
                    });
                }
            });
    }
 
    render() {
        return (
            <div>
                <VideoPlayer video={this.state.videoData}/>
            </div>
        )
    }
}


// export default function VideoPage() {
//     let params:any = useParams();
//     let videoId:string = params.videoId;
//     console.log(params)
//     return (
//         <div>
//             <p> {videoId} </p>
//         </div>
//     )
// }

