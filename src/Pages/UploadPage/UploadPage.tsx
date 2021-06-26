import { Component } from "react";
import UploadGIF from "../../Components/Upload/UploadGIF";

export default class UploadPage extends Component {
    render() {
        return (
            <div className="container-upload-page">
                <h1>Upload</h1>
                <UploadGIF></UploadGIF>
            </div>
        )
    }
}