import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./TitleBar.css";

export default class TitleBar extends Component {
    render() {
        return (
            <nav className="title-bar-main-box">
                <div className="title-bar-content-box">
                    <p className="title-bar-title">Asciiflix</p>
                    <div className="title-bar-links">
                        <p className="title-bar-page"><Link to="/">Home</Link></p>
                        <p className="title-bar-page"><Link to="/login">Login</Link></p>
                    </div>
                </div>
            </nav>
        )
    }
}
