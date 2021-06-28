import React, { Component } from 'react'
import UserPreview from '../../Common/UserPreview/UserPreview';
import VideoPreview from '../../Common/VideoPreview/VideoPreview';
import { backendURL } from '../../Config';
import SearchResultModel from '../../Models/SearchResultModel';

interface SearchPageProps {

}

interface SearchPageState{
    searchQuery: string
    searchResults: SearchResultModel
    hasSearched: boolean
}

const EMPTY_RESULTS = {Users: [], Videos: []};

export default class SearchPage extends Component<SearchPageProps, SearchPageState> {
    constructor(props: SearchPageProps) {
        super(props);
        this.state = {
            searchQuery: "",
            searchResults: EMPTY_RESULTS,
            hasSearched: false
        }
    }
    
    getSearchResultsFormServer = async () => {
        let httpCode:number = 0;
        let searchResults: SearchResultModel = EMPTY_RESULTS;

        await fetch(backendURL + '/search?query=' + this.state.searchQuery)
        .then((response: Response) => {
            httpCode = response.status;
            return response.json();
        })
        .then((json) => {
            searchResults = json as SearchResultModel;
        }).catch( e => {
            searchResults = EMPTY_RESULTS
        });
        if (httpCode !== 200) {
            searchResults = EMPTY_RESULTS
        }
        if (searchResults.Users === null) {
            searchResults.Users = [];
        }
        if (searchResults.Videos === null) {
            searchResults.Videos = [];
        }
        this.setState({
            searchResults: searchResults,
            hasSearched: true
        })
        console.log(searchResults)
    }

    handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.getSearchResultsFormServer()
    }

    handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({searchQuery: event.currentTarget.value as string})
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <input type="text" value={this.state.searchQuery} onChange={this.handleSearchChange}/>
                </form>
                {this.state.searchResults.Videos.map(video => <VideoPreview key={video.UUID} uuid={video.UUID} title={video.Title} creator_id={video.UserID}/>)}
                {this.state.searchResults.Users.map(user => <UserPreview key={user.UserID} username={user.Name} description={user.Desciption} userId={user.UserID}/>)}
            </div>
        )
    }
}
