import { Component } from "react";
import VideoPreview from "../../Common/VideoPreview/VideoPreview";
import { backendURL } from "../../Config";
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import { UserContext } from "../../UserContext";
import "./Recommendations.css";


interface RecommendationsProps {
    limit: number

}

interface RecommendationsState {
    videos: VideoMetaDataModel[]
    limit: number
}

export default class Recommendations extends Component<RecommendationsProps, RecommendationsState>{
    static contextType = UserContext;

    constructor(props: RecommendationsProps) {
        super(props);
        this.state = {
            videos: [],
            limit: props.limit
        };
    }

    async fetchVideoDataPublic() {
        let httpCode: number = 0;
        let fetchedVideoData: VideoMetaDataModel[] = [];
        await fetch(backendURL + "/video/getRecomendations?limit=" + this.state.limit)
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                fetchedVideoData = json as VideoMetaDataModel[];
            })
            .catch(e => {
                fetchedVideoData = [];
            });
        if (httpCode === 200) {
            this.setState({
                videos: fetchedVideoData
            });
        }
    }

    async fetchVideoDataPrivate() {
        let httpCode: number = 0;
        let fetchedVideoData: VideoMetaDataModel[] = [];
        await fetch(backendURL + "/secure/video/getUserRecomendations?limit=" + this.state.limit, {
            method: "GET",
            headers: {
                "Token": this.context.jwtToken
            }
        })
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                fetchedVideoData = json as VideoMetaDataModel[];
            })
            .catch(e => {
                fetchedVideoData = [];
            });
        if (httpCode === 200) {
            this.setState({
                videos: fetchedVideoData
            });          
        }
    }

    componentDidMount = () => {
        if (this.context.jwtToken === "") {
            this.fetchVideoDataPublic();
        } else {
            this.fetchVideoDataPrivate();
        }
    }

    render() {
        return (   
            <div className="recommendations-container">
                {this.state.videos.map((video, index) => <VideoPreview key={index} title={video.Title} creator_id={video.UserID} uuid={video.UUID}></VideoPreview>)}
            </div>
        )
    }
}