import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./UserPreview.css";

interface UserPreviewProps {
    username: string
    description: string
    userId: string
}

export default class UserPreview extends Component<UserPreviewProps> {

    render() {
        return (
            <div>
                <Link to={"/user/" + this.props.userId} className="user-preview-link">
                    <p>{this.props.username}</p>
                    <p>{this.props.description}</p>
                </Link>
            </div>
        )
    }
}

