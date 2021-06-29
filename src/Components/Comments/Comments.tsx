import React, { Component } from 'react';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { getUserNameFromAPI } from '../../Common/Helper/UsernameApi';
import { JwtUserInfo } from '../../Common/JwtContext/JwtContext';
import { backendURL } from '../../Config';
import CommentModel from "../../Models/CommentModel";
import "./Comments.css";

interface CommentInformation {
    content: string
}

interface CommentsState {
    commentsData: CommentModel[] | null,
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
        };
    }
    componentDidMount = () => {
        this.fetchDataFromApi();
    }

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

    commentInfo: CommentInformation = {
        content: "",
    }

    async uploadCommentToAPI() {
        let httpCode: number = 0;
        await fetch(backendURL + "/secure/video/createComment?id=" + this.props.videoId, {
            method: "POST",
            headers: { "Token": this.props.jwtUserInfo.jwtToken, "Content-Type": "application/json" },
            body: JSON.stringify({
                "Content": this.commentInfo.content
            })
        }).then(response => {
            httpCode = response.status;
        });
        if (httpCode === 201) {
            this.fetchDataFromApi();
            this.commentInfo.content = "";
        }

    }
    submit_comment = (e: SyntheticEvent) => {
        e.preventDefault();
        this.uploadCommentToAPI();
    }




    render() {
        if (this.state.commentsData === null) {
            return <p>Could not get comment data.</p>
        } 
        return (
            <div className="comment-section-container">
                {this.props.jwtUserInfo.jwtToken !== "" ?
                <div className="comment-form-container">
                        <h2>Write Comment</h2>
                        <form className="comment-submit" onSubmit={this.submit_comment}>
                        <label className="form-label-text">Content:</label>
                        <textarea placeholder="A nice comment...." rows={5} required onChange={e => this.commentInfo.content = e.target.value}></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <hr className="line"/>
                </div>: <></>}
            <div className="comments-container">
                      {this.state.commentsData.map((comment, index) => <div className="comment-container">
                          <p><Link to={"/user/" + comment.UserID} className="comment-username">{comment.Username}</Link> on {new Date(comment.CreatedAt).toDateString()}</p>
                          <p>{comment.Content}</p>
                          <hr className="line"/>
                      </div>)}
            </div>
            </div>
        )
    }
}
