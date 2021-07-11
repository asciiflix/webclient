import { Component, SyntheticEvent } from "react";
import { JwtUserInfo } from "../../Common/JwtContext/JwtContext";
import { backendURL } from "../../Config";
import "../Login/UserLogin.css";
import "../Settings/Settings.css";
import "./UploadGIF.css";
import uploadSVG from "./upload_icon.svg";


interface UploadForm {
    title: string,
    description: string
    gif: FileList | null
}

interface UploadState {
    uploaded: boolean
    uploadedFile: boolean
    submitted: boolean
    failed: boolean
    videoURL: string
    videoName: string
}

interface UploadProps {
    jwtUserInfo: JwtUserInfo
    changeJwt: Function
}

export default class UploadGIF extends Component<UploadProps, UploadState> {
    uploadData: UploadForm = {
        title: "",
        description: "",
        gif: null
    };

    constructor(props: UploadProps) {
        super(props);
        this.state = {
            uploaded: false,
            failed: false,
            uploadedFile: false,
            submitted: false,
            videoURL: "",
            videoName: ""
        };
    }

    handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        this.uploadData.gif = e.target.files;
        this.setState({ videoName: this.uploadData.gif?.[0].name as string })
        this.setState({ uploadedFile: true });
    }

    submit_upload = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!this.state.submitted) {
            this.setState({submitted: true});
            this.uploadDataToAPI();
        }
    }

    async uploadDataToAPI() {
        //Create Form Data
        const formData = new FormData();
        let gif: File = this.uploadData.gif?.[0] as File;
        formData.append("gif", gif);
        formData.append("title", this.uploadData.title);
        formData.append("description", this.uploadData.description);

        //Upload FormData to API
        let httpCode: number = 0;
        let response_msg: string = "";
        await fetch(backendURL + "/secure/video/uploadGif", {
            method: "POST",
            headers: { "Token": this.props.jwtUserInfo.jwtToken },
            body: formData
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            })
            .then(json => response_msg = json.videoID);
        if (httpCode === 201) {
            this.setState(
                { uploaded: true, videoURL: "/watch/" + response_msg });
        } else {
            this.setState({ failed: true, submitted: false });
        }
    }



    render() {
        return (
            <div className="upload-form-container">
                <div className="empty-div-settings">
                    <h1 className="form-title-text">Upload</h1>
                    <p>Upload your favorite GIF and Asciiflix will create a nice asciiflix-style "Video"</p>
                    {this.state.uploaded ? <div className="form-settings-successfully"> <p>Video Successfully Uploaded! Here is the <a className="link-text" href={this.state.videoURL}>Link</a></p></div> : <></>}
                    {this.state.failed ? <p className="login-form-failed-login">Upload Failed!</p> : <></>}

                    <div className="upload-file">
                        <label htmlFor="file">
                            {this.state.uploadedFile ? <h2 className="upload-text">{this.state.videoName}</h2> : <img className="upload-button" src={uploadSVG} alt="upload-icon"></img>}
                        </label>
                        <input id="file" type="file" accept="image/gif" required onChange={e => this.handleImage(e)}></input>
                    </div>

                    <h2 className="form-title-text">Meta Information</h2>
                    <form className="upload-grid" onSubmit={this.submit_upload}>
                        <label className="form-label-text">Title:</label>
                        <input className="form-input" type="name" placeholder="My First Video on Asciiflix :)" required onChange={e => this.uploadData.title = e.target.value}></input>

                        <label className="form-label-text">Description:</label>
                        <textarea className="upload-input-desc" placeholder="A very nice ascii-gif...." rows={10} required onChange={e => this.uploadData.description = e.target.value}></textarea>

                        <button className="login-button" type="submit" disabled={this.state.uploaded}>Upload</button>
                    </form>
                </div>
            </div>
        )
    }
}