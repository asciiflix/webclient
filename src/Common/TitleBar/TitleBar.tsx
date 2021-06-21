import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import "./TitleBar.css";

interface TitlebarProps {
    username: string
}

export default class TitleBar extends Component<TitlebarProps> {
    static contextType = UserContext;

/*     constructor() {
        super(Component);
        this.state = {
            jwtToken: this.context.jwtToken,
            username: this.context.username,
        };
    } */

    render() {
        return (
            <nav className="title-bar-main-box">
                <div className="title-bar-content-box">
                    <Link to="/" className="title-bar-title">Asciiflix</Link>
                    <div className="title-bar-links">
                        <Link className="title-bar-page" to="/">Home</Link>
                    
                               {this.props.username === "" ? <Link className="title-bar-page" to="/login">Login</Link> :
                               <Link className="title-bar-page" to="/logout">Logout {/* for {value.username} */}</Link> }                            
                    </div>
                </div>
            </nav>
        )
    }
}
