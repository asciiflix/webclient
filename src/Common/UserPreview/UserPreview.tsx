import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import shortCreatorName from '../Helper/UserNameShorter';
import "./UserPreview.css";
import circle from "./UserPreview.svg"

interface UserPreviewProps {
    username: string
    description: string
    userId: string
}

export default class UserPreview extends Component<UserPreviewProps> {

    //Returns a shorter Description if its longer then 15 chars. (ex. UltraLongDescription -> UltraLongDescri...)
    getShortDesc = () => {
        if (this.props.description === undefined)
            return "Ultra cool dude..."
        console.log(this.props.description)
        if (this.props.description.length < 15) {
            return this.props.description;
        } else {
            return this.props.description.slice(0, 15) + "...";
        }
    }

    render() {
        return (
            <div className="user-preview-container">
                <img src={circle} alt="circle" className="user-preview-circle"/>
                <Link to={"/user/" + this.props.userId} className="user-preview-link">
                    <p className="user-preview-username">{shortCreatorName(this.props.username, 15)}</p>
                    <p className="user-preview-desc">{this.getShortDesc()}</p>
                </Link>
            </div>
        )
    }
}

