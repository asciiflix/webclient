import { Component } from "react";
import Recommendations from "../../Components/Recommendations/Recommendations";
import VideoMetaDataModel from "../../Models/VideoMetadataModel";
import "./HomePage.css";

interface HomePageProps {

}

interface HomePageState {
    videos: VideoMetaDataModel[]
}

export default class HomePage extends Component<HomePageProps, HomePageState> {
    render() {
        return (
            <div className="home-page-container">
                <Recommendations limit={20}></Recommendations>
            </div>
        )
    }
}