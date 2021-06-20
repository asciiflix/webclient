import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./TitleBar.css";

export default class TitleBar extends Component {
    render() {
        return (
            <nav className="title-bar-main-box">
                <div className="title-bar-content-box">
                    <Link to="/" className="title-bar-title">Asciiflix</Link>
                    <div className="title-bar-links">
                        <Link className="title-bar-page" to="/">Home</Link>
                        <Link className="title-bar-page" to="/login">Login</Link>
                    </div>
                </div>
            </nav>
        )
    }
}
