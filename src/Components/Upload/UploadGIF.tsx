import { Component, SyntheticEvent } from "react";
import { backendURL } from "../../Config";
import { UserContext } from "../../UserContext";

interface UploadForm {
    title: string,
    description: string
    gif: FileList | null
}

interface UploadState {
    uploaded: boolean
    failed: boolean
    videoURL: string
}

interface UploadProps {

}

export default class UploadGIF extends Component<UploadProps, UploadState> {
    static contextType = UserContext;

    uploadData: UploadForm = {
        title: "",
        description: "",
        gif: null
    };

    constructor(props: UploadProps) {
        super(props);
        this.setState({
            uploaded: false,
            failed: false
        });
    }

    submit_upload = (e: SyntheticEvent) => {
        e.preventDefault();
        this.uploadDataToAPI();
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
            headers: { "Token": this.context.jwtToken },
            body: formData
        })
            .then(response => {
                httpCode = response.status;
                return response.json();
            })
            .then(json => response_msg = json);
        if (httpCode === 201) {
            this.setState(
                { uploaded: true, videoURL: "/watch/" + response_msg });
        } else {
            this.setState({ failed: true });
        }
    }



    render() {
        return (
            <div className="container-upload-gif">
                <h1>GIF-Uploader</h1>
                <form onSubmit={this.submit_upload}>
                    <label>Title</label>
                    <input type="name" placeholder="Title" required onChange={e => this.uploadData.title = e.target.value}></input>

                    <label>Description</label>
                    <input type="name" placeholder="Description" required onChange={e => this.uploadData.description = e.target.value}></input>

                    <label>GIF-File</label>
                    <input type="file" required onChange={e => this.uploadData.gif = e.target.files}></input>

                    <button>Upload</button>
                </form>
            </div>
        )
    }

}