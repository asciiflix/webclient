import React, { Component } from 'react';
import Recommendations from '../Recommendations/Recommendations';
import "./RecommendationBar.css";

export default class RecommendationBar extends Component {
    render() {
        return (
            <div className="recommendation-bar-container">
                <Recommendations limit={4}></Recommendations>
            </div>
        )
    }
}
