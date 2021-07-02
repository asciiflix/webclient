import { Link } from 'react-router-dom';
import "./TitleBar.css";
import searchIcon from "./search.svg"
import TitleBarMenu from '../TitleBarMenu/TitleBarMenu';
import { JwtConext } from '../JwtContext/JwtContext';

import React, { Component } from 'react'

export default class TitleBar extends Component {
    render() {
        return (
            <nav className="title-bar-main-box">
            <div className="title-bar-content-box">
                <Link to="/" className="title-bar-title">Asciiflix</Link>
                    <JwtConext.Consumer>
                        {({jwtUserInfo}) => {
                            return <div className="title-bar-links">
                                <Link to="/search" className="title-bar-page-link"><p className="title-bar-page">Search</p><img className="title-bar-icon" src={searchIcon} alt="Search Icon"/> </Link>
                                <TitleBarMenu jwtUserInfo={jwtUserInfo}></TitleBarMenu>
                            </div>}}
                    </JwtConext.Consumer>
                </div>
            </nav>
        )
    }
}