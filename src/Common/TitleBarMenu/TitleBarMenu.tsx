import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import tabIcon from "./tabs.svg"
import "../TitleBar/TitleBar.css";
import "./TitleBarMenu.css"
import { JwtUserInfo } from '../JwtContext/JwtContext';
import jwt_decode from '../Helper/JwtDecoder';

interface TitleBarMenuProps {
    jwtUserInfo: JwtUserInfo
}

interface TitleBarMenuState {
    showMenu: boolean
    userID: string
}

export default class TitleBarMenu extends Component<TitleBarMenuProps, TitleBarMenuState> {

    constructor(props: TitleBarMenuProps) {
        super(props);
        this.state = {
            showMenu: false,
            userID: ""
        };
    }

    showMenu = () => {
        this.setState({
            showMenu: true
        });
    }

    removeMenu = () => {
        this.setState({
            showMenu: false
        });
    }

    componentDidMount = () => {
        this.getUserURL();
    }

    getUserURL = () => {
        if (this.props.jwtUserInfo.jwtToken !== "") {
            let userID: string = jwt_decode(this.props.jwtUserInfo.jwtToken)["User_ID"];
            this.setState({ userID: userID });
        }
    }


    renderMenu = () => {
        return (
            <div className="title-bar-menu-action-container">
                <div className="title-bar-menu-cover" onMouseEnter={this.removeMenu} onClick={this.removeMenu}></div>
                <div className="title-bar-menu-container">
                    {this.props.jwtUserInfo.username === "" ?
                        <div>
                            <p className='title-bar-menu-title title-bar-menu-sub-link'>Guest-User</p>
                            <Link onClick={this.removeMenu} to="/login" className="title-bar-menu-sub-link">Login</Link>
                            <Link onClick={this.removeMenu} to="/register" className="title-bar-menu-sub-link">Register</Link>
                            <Link onClick={this.removeMenu} to="/about" className="title-bar-menu-sub-link">About</Link>
                        </div> :
                        <div>
                            <p className='title-bar-menu-title title-bar-menu-sub-link'>{this.props.jwtUserInfo.username}</p>
                            <Link onClick={this.removeMenu} to="/settings" className="title-bar-menu-sub-link">Settings</Link>
                            <Link onClick={this.removeMenu} to="/upload" className="title-bar-menu-sub-link">Upload</Link>
                            <a onClick={this.removeMenu} href={"/user/" + this.state.userID} className="title-bar-menu-sub-link">Profile</a>
                            <Link onClick={this.removeMenu} to="/about" className="title-bar-menu-sub-link">About</Link>
                            <Link onClick={this.removeMenu} to="/logout" className="title-bar-menu-sub-link">Logout</Link>
                        </div>
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {/* <Link to="/logout"> */}
                {this.props.jwtUserInfo.username === "" ?
                    /*<p className="title-bar-page" onMouseEnter={this.showMenu} onClick={this.showMenu}>Menu</p> */
                    <img onClick={this.showMenu} className="title-bar-page" src={tabIcon} alt="TabIcon" /> :
                    <p className="title-bar-page" onMouseEnter={this.showMenu} onClick={this.showMenu}>{this.props.jwtUserInfo.username}</p>
                }
                <img onClick={this.showMenu} className="title-bar-icon" src={tabIcon} alt="TabIcon" />
                {/* </Link> */}
                {this.state.showMenu ? this.renderMenu() : <></>}
            </div>
        )
    }
}
