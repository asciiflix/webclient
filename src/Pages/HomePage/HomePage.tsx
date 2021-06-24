import { Component } from "react";
import VideoPreview from "../../Common/VideoPreview/VideoPreview";
import { backendURL } from "../../Config";
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import { UserContext } from "../../UserContext";
import "./HomePage.css"

interface HomePageProps {

}

interface HomePageState {
    videos: VideoMetaDataModel[]
}

export default class HomePage extends Component<HomePageProps, HomePageState> {
    static contextType = UserContext;
    
    constructor(props: HomePageProps) {
        super(props);
        this.state= {
            videos: []
        };
    }

    async fetchVideoData() {
        let httpCode:number = 0;
        let fetchedVideoData: VideoMetaDataModel[] = [];
        await fetch(backendURL + "/video/getVideos")
        .then((response: Response) => {
            httpCode = response.status;
            return response.json();
        })
        .then((json) => {
            fetchedVideoData = json as VideoMetaDataModel[];
        })
        .catch( e => {
            fetchedVideoData = [];
        });
        if (httpCode === 200) {
            this.setState({
                videos: fetchedVideoData
            });
        }
    }

    componentDidMount = () => {
        this.fetchVideoData();
    }

    render() {
        return (
            <div className="home-page-container">
                {this.state.videos.map((video, index) => <VideoPreview title={video.Title} uuid={video.UUID}></VideoPreview>)}
            </div>
        )
    }
}