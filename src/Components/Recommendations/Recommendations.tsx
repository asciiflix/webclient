import { Component } from "react";
import App from "../../App";
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
    private app: App = new App(this.props);
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
                this.addCreatorName(fetchedVideoData);
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

    async addCreatorName(videos: VideoMetaDataModel[]) {
        //Getting User/Creator - Names from API to insert in VideoData
        videos.map(async (video, index) => {
            let creator: string = "";
            let id: string = String(video.UserId);
            await this.app.getUserNameFromAPI(id)
                .then(response => {
                    creator = response;
                });
            video.Creator = creator;
        });
    }

    componentDidMount = () => {
        if (this.context.jwtToken === "") {
            this.fetchVideoDataPublic();
        } else {
            this.fetchVideoDataPrivate();
        }
    }

    render() {
        console.log(this.state.videos);
        return (            
            <div className="recommendations-container">
                {this.state.videos.map((video, index) => <VideoPreview title={video.Title} creator={video.Creator} uuid={video.UUID}></VideoPreview>)}
            </div>
        )
    }
}