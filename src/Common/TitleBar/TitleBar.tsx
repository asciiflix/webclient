import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import "./TitleBar.css";

export default class TitleBar extends Component {
    static contextType = UserContext;

    render() {
        return (
            
            <nav className="title-bar-main-box">
                <div className="title-bar-content-box">
                    <Link to="/" className="title-bar-title">Asciiflix</Link>
                    <div className="title-bar-links">
                        <Link className="title-bar-page" to="/">Home</Link>
                        {this.context === null && <Link className="title-bar-page" to="/login">Login</Link>}
                        {this.context !== null && <Link className="title-bar-page" to="/logout">Logout</Link>}
                    </div>
                </div>
            </nav>
        )
    }
}
