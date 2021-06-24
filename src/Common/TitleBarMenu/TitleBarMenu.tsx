import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import tabIcon from "./tabs.svg"
import "../TitleBar/TitleBar.css";
import "./TitleBarMenu.css"

interface TitleBarMenuProps {
    username: string
}

interface TitleBarMenuState {
    showMenu: boolean
}

export default class TitleBarMenu extends Component<TitleBarMenuProps, TitleBarMenuState> {

    constructor(props: TitleBarMenuProps) {
        super(props);
        this.state = {
            showMenu: false
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

    renderMenu = () => {
        return (
            <div className="title-bar-menu-action-container">
                <div className="title-bar-menu-cover" onMouseEnter={this.removeMenu} onClick={this.removeMenu}></div>
                <div className="title-bar-menu-container">
                    <p className='title-bar-menu-title title-bar-menu-sub-link'>{this.props.username}</p>
                    <Link onClick={this.removeMenu} to="/" className="title-bar-menu-sub-link">Settings</Link>
                    <Link onClick={this.removeMenu} to="/" className="title-bar-menu-sub-link">Upload</Link>
                    <Link onClick={this.removeMenu} to="/" className="title-bar-menu-sub-link">Profile</Link>
                    <Link onClick={this.removeMenu} to="/logout" className="title-bar-menu-sub-link">Logout</Link>
                </div>
            </div>
        ) 
    }
    
    render() {
        if (this.props.username === ""){
            return <Link to="/login" className="title-bar-page-link"><p className="title-bar-page">Login</p> <img className="title-bar-icon" src={tabIcon} alt="Tab Icon"/></Link>
        }
        return (
            <div>
                {/* <Link to="/logout"> */}
                    <p className="title-bar-page" onMouseEnter={this.showMenu} onClick={this.showMenu}>{this.props.username}</p>
                    <img onClick={this.showMenu} className="title-bar-icon" src={tabIcon} alt="TabIcon"/> 
                {/* </Link> */}
                    {this.state.showMenu ? this.renderMenu() : <></>}
            </div>
        )
    }
}
