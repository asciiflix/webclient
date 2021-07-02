import { Component } from "react";

export default class About extends Component {
    render() {
        return (
            <div className="about-container">
                <h1 className="form-title-text">About Asciiflix</h1>
                <p>Imagine this, you just spent an entire summer on netflix. This sucks, netflix, prime, etc. are all far too addictive and in many cases impossible to use with german bandwidth. What we need, is a bad version of netflix with low bandwidth usage. Asciiflix can provide all of these features!</p>

                <h1 className="form-title-text">OpenSource</h1>
                Visit our GitHub Organization for the backend and frontend source-code: <a href="https://github.com/asciiflix">github.com/asciiflix</a>
            </div>
        )
    }
}