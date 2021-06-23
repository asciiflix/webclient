import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import "./TitleBar.css";
import searchIcon from "./search.svg"
import tabIcon from "./tabs.svg"

interface TitlebarProps {
    username: string
}

export default class TitleBar extends Component<TitlebarProps> {
    static contextType = UserContext;

    render() {
        return (
            <nav className="title-bar-main-box">
                <div className="title-bar-content-box">
                    <Link to="/" className="title-bar-title">Asciiflix</Link>
                    <div className="title-bar-links">
                        <Link to="/"><p className="title-bar-page">Search</p><img className="title-bar-icon" src={searchIcon}/> </Link>

                        {this.props.username === "" ? <Link to="/login"><p className="title-bar-page">Login</p> <img className="title-bar-icon" src={tabIcon}/></Link> :
                            <Link to="/logout"><p className="title-bar-page">Logout</p> {/* for {value.username} */<img className="title-bar-icon" src={tabIcon}/>}</Link>}
                        
                    </div>
                </div>
            </nav>
        )
    }
}
