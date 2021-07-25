import { Component } from 'react';
import Search from '../../Components/Search/Search';
import "./SearchPage.css";



export default class SearchPage extends Component {
    render() {
        return (
            <div className="search-page">
                <Search></Search>
            </div>
        )
    }    
}
