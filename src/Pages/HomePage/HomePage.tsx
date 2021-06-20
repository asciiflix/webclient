import React, { Component } from "react";
import { UserContext } from "../../UserContext";

export default class HomePage extends Component {
    static contextType = UserContext;
    
    render() {
        console.log(this.context);
        return (
            <h1>Home</h1>
        )
    }
}