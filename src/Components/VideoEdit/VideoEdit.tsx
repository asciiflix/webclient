import { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "../../Common/Helper/JwtDecoder";
import { JwtUserInfo } from "../../Common/JwtContext/JwtContext";
import { backendURL } from "../../Config";
import VideoMetaDataModel from "../../Models/VideoMetadataModel";

interface EditProps {
    jwtUserInfo: JwtUserInfo
    videoID: string
}

interface EditStats {
    videoMetaData: VideoMetaDataModel | null,
    videoEdited: boolean
    videoDeleted: boolean
    noData: boolean
    allowed: boolean

}

interface VideoInformation {
    title: string
    description: string
}


export default class VideoEdit extends Component<EditProps, EditStats> {
    constructor(props: EditProps) {
        super(props);
        this.state = {
            videoEdited: false,
            videoDeleted: false,
            noData: false,
            allowed: true,
            videoMetaData: null
        };
    }

    videoEdit: VideoInformation = {
        title: "",
        description: "",
    };

    submit_update = (e: SyntheticEvent) => {
        e.preventDefault();
        if (this.videoEdit.description === "" && this.videoEdit.title === "") {
            this.setState({ noData: true });
        } else {
            this.setState({ noData: false });
            this.updateVideo();
        }
    }

    submit_delete = (e: SyntheticEvent) => {
        e.preventDefault();
        this.deleteVideo();
    }

    async getVideoDataFromAPI() {
        let httpCode: number = 0;
        let videoDataFetched: VideoMetaDataModel | null = null;
        await fetch(backendURL + '/video/getVideo?id=' + this.props.videoID)
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                videoDataFetched = json as VideoMetaDataModel;
            })
            .catch(e => {
                videoDataFetched = null;
            });
        if (httpCode === 200) {
            this.setState({
                videoMetaData: videoDataFetched,
            });
            //Check if user is allow to edit
            let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken)["User_ID"].toString();
            let compUserID: string = this.state.videoMetaData?.UserID.toString() as string;
            if (compUserID !== userID) {
                this.setState({ allowed: false });
            }
        } else {
            this.setState({ allowed: false });
        }
    }

    async updateVideo() {
        let httpCode: number = 0;
        await fetch(backendURL + '/secure/video/updateVideo?id=' + this.props.videoID, {
            method: "PUT",
            headers: { "Token": this.props.jwtUserInfo.jwtToken, "Content-Type": "application/json" },
            body: JSON.stringify({
                "Title": this.videoEdit.title,
                "Description": this.videoEdit.description
            })
        })
            .then((response: Response) => {
                httpCode = response.status;
            });
        if (httpCode === 202) {
            this.setState({
                videoEdited: true,
            });
        }
    }

    async deleteVideo() {
        let httpCode: number = 0;
        await fetch(backendURL + '/secure/video/deleteVideo?id=' + this.props.videoID, {
            method: "DELETE",
            headers: { "Token": this.props.jwtUserInfo.jwtToken, "Content-Type": "application/json" }
        })
            .then((response: Response) => {
                httpCode = response.status;
            });
        if (httpCode === 200) {
            this.setState({
                videoDeleted: true,
            });
        }
    }

    componentDidMount = () => {
        this.getVideoDataFromAPI();
    }

    render() {
        return (
            <div className="upload-form-container">
                <div className="empty-div-settings">
                    {this.state.allowed ? <></> : <Redirect to="/"></Redirect>}
                    <h1 className="form-title-text">Video Edit</h1>
                    <h2 className="form-title-text">Meta Information</h2>
                    {this.state.videoEdited ? <p className="form-settings-successfully">Video Successfully Edited!</p> : <></>}
                    {this.state.noData ? <p className="login-form-failed-login">No Data to Update!</p> : <></>}
                    <form className="upload-grid" onSubmit={this.submit_update}>
                        <label className="form-label-text">Title:</label>
                        <input className="form-input" type="name" placeholder={this.state.videoMetaData?.Title} onChange={e => this.videoEdit.title = e.target.value}></input>

                        <label className="form-label-text">Description:</label>
                        <textarea className="upload-input-desc" placeholder={this.state.videoMetaData?.Description} rows={10} onChange={e => this.videoEdit.description = e.target.value}></textarea>

                        <button className="login-button" type="submit">Update Video</button>
                    </form>

                    <h2 className="form-title-text">Danger Zone</h2>
                    {this.state.videoDeleted ? <p className="form-settings-successfully">Video Successfully Deleted!</p> : <></>}
                    <form className="upload-grid" onSubmit={this.submit_delete}>
                        <button className="delete-button" type="submit">Delete Video</button>
                    </form>
                </div>
            </div>
        )
    }
}