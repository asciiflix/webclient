import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import "./TitleBar.css";
import searchIcon from "./search.svg"
import TitleBarMenu from '../TitleBarMenu/TitleBarMenu';

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
                        <Link to="/" className="title-bar-page-link"><p className="title-bar-page">Search</p><img className="title-bar-icon" src={searchIcon}/> </Link>
                        <TitleBarMenu username={this.props.username}></TitleBarMenu>
                    </div>
                </div>
            </nav>
        )
    }
}
