import { Component } from 'react';
import { match } from 'react-router-dom';
import UserProfile from '../../Components/UserProfile/UserProfile';
import "./UserProfilePage.css";

interface UserProfilePageProps {
    match: match<any>
}

export default class UserProfilePage extends Component<UserProfilePageProps> {
    render() {
        return (
            <div className="user-page">
                <UserProfile userID={this.props.match.params.userId}></UserProfile>
            </div>
        )
    }    
}