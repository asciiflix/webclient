import { Component } from "react";
import { JwtConext } from "../../Common/JwtContext/JwtContext";
import VideoPreview from "../../Common/VideoPreview/VideoPreview";
import { backendURL } from "../../Config";
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import "./Recommendations.css";


interface RecommendationsProps {
    limit: number
}

interface RecommendationsState {
    videos: VideoMetaDataModel[]
    hasPrivateVideos: boolean
    limit: number
}

export default class Recommendations extends Component<RecommendationsProps, RecommendationsState>{
    jwtToken: string = ""

    constructor(props: RecommendationsProps) {
        super(props);
        this.state = {
            videos: [],
            limit: props.limit,
            hasPrivateVideos: false
        };
    }

    //Get Non-Specific Recommendation if user isn't logged in.
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

    //Get User-specific Recommendations (only when user is logged in)
    async fetchVideoDataPrivate() {
        let httpCode: number = 0;
        let fetchedVideoData: VideoMetaDataModel[] = [];
        await fetch(backendURL + "/secure/video/getUserRecomendations?limit=" + this.state.limit, {
            method: "GET",
            headers: {
                "Token": this.jwtToken
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

    //Load Recommendations on Component load
    componentDidMount = () => {
        if (this.jwtToken === "") {
            this.fetchVideoDataPublic();
        } else {
            this.fetchVideoDataPrivate();
            this.setState({hasPrivateVideos: true});
        }
    }

    //Get new Recommendations after the component did update (ex. clicked on new Video)
    componentDidUpdate() {
        if (!this.state.hasPrivateVideos && this.jwtToken !== ""){
            this.fetchVideoDataPrivate();
            this.setState({hasPrivateVideos: true});
        }
    }

    render() {
        return (
            <JwtConext.Consumer>
                {({jwtUserInfo, changeJwt}) => {
                    this.jwtToken = jwtUserInfo.jwtToken;
                    if (this.state.videos === null)
                        return <></>
                    return <div className="recommendations-container">
                        {this.state.videos.map((video, index) => <VideoPreview key={index} title={video.Title} creator_id={video.UserID} uuid={video.UUID}></VideoPreview>)}
                    </div>
                }}
            </JwtConext.Consumer>   
        )
    }
}