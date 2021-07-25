import React, { Component } from 'react';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import getLang from '../../Common/Helper/Date';
import { getUserNameFromAPI } from '../../Common/Helper/UsernameApi';
import { JwtUserInfo } from '../../Common/JwtContext/JwtContext';
import { backendURL } from '../../Config';
import CommentModel from "../../Models/CommentModel";
import "./Comments.css";


interface CommentsState {
    commentsData: CommentModel[] | null,
    formText: string
}

interface CommentsProps {
    videoId: string
    jwtUserInfo: JwtUserInfo
}

export default class VideoInfo extends Component<CommentsProps, CommentsState> {
    constructor(props: CommentsProps) {
        super(props);
        this.state = {
            commentsData: null,
            formText: ""
        };
    }

    componentDidMount = () => {
        this.fetchDataFromApi();
    }

    //Get all Video-specific comments from the backend
    async fetchDataFromApi() {
        let httpCode: number = 0;
        let commentsDataFetched: CommentModel[] | null = null;
        await fetch(backendURL + '/video/getComments?id=' + this.props.videoId)
            .then((response: Response) => {
                httpCode = response.status;
                return response.json();
            })
            .then((json) => {
                commentsDataFetched = json as CommentModel[];
            })
            .catch(e => {
                commentsDataFetched = null;
            });
        if (httpCode === 200) {
            this.setState({
                commentsData: commentsDataFetched,
            });
            this.updateUsernames();

        }
    }

    //Get usernames for every comment
    async updateUsernames() {
        if (this.state.commentsData !== null){
            let data = this.state.commentsData
            for (let index = 0; index < data.length; index++) {
                let userID = data[index].UserID
                data[index].Username = await getUserNameFromAPI(userID.toString());
            }
            this.setState({
                commentsData: data,
            })
        }
    }


    //Post Request to the backend to create a comment
    async uploadCommentToAPI() {
        let httpCode: number = 0;
        await fetch(backendURL + "/secure/video/createComment?id=" + this.props.videoId, {
            method: "POST",
            headers: { "Token": this.props.jwtUserInfo.jwtToken, "Content-Type": "application/json" },
            body: JSON.stringify({
                "Content": this.state.formText
            })
        }).then(response => {
            httpCode = response.status;
        });
        if (httpCode === 201) {
            this.fetchDataFromApi();
        }

    }

    //Submit Handler
    submit_comment = (e: SyntheticEvent) => {
        e.preventDefault();
        this.uploadCommentToAPI();
        this.setState({
            formText:"",
        })
    }

    render() {
        if (this.state.commentsData === null) {
            return <p>Could not get comment data.</p>
        } 
        return (
            <div className="comment-section-container">
                {this.props.jwtUserInfo.jwtToken !== "" ?
                <div className="comment-form-container">
                        <h2 className="comments-title">Write Comment</h2>
                        <form onSubmit={this.submit_comment}>
                        <textarea className="comment-form-textarea" placeholder="Write something nice..." rows={5} value={this.state.formText} required onChange={e => this.setState({formText: e.target.value,})}></textarea><br/>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                    <hr className="line"/>
                </div>: <></>}
            <div className="comments-container">
            <h2 className="comments-title">Comments</h2>
            <hr className="line"/>
                      {this.state.commentsData.map((comment, index) => <div className="comment-container">
                          <p><Link to={"/user/" + comment.UserID} className="comment-username">{comment.Username}</Link> on {new Date(comment.CreatedAt).toLocaleString(getLang())}</p>
                          <pre className="comment-text">{comment.Content}</pre>
                          <hr className="line"/>
                      </div>)}
            </div>
            </div>
        )
    }
}
