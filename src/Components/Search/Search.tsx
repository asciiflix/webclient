import { Component } from "react";
import UserPreview from "../../Common/UserPreview/UserPreview";
import VideoPreview from "../../Common/VideoPreview/VideoPreview";
import { backendURL } from "../../Config";
import SearchResultModel from "../../Models/SearchResultModel";
import "./Search.css"

interface SearchPageProps {

}

interface SearchPageState{
    searchQuery: string
    searchResults: SearchResultModel
    hasSearched: boolean
}

const EMPTY_RESULTS = {Users: [], Videos: []};

export default class Search extends Component<SearchPageProps, SearchPageState> {
    constructor(props: SearchPageProps) {
        super(props);
        this.state = {
            searchQuery: "",
            searchResults: EMPTY_RESULTS,
            hasSearched: false
        }
    }
    
    //Get Search Results from backend
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

    //Do search on "Enter"
    handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.getSearchResultsFormServer()
    }

    //New Search after Input has changed and "Enter"
    handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({searchQuery: event.currentTarget.value as string})
    }
    
    render() {
        console.log(this.state.searchResults)
        return (
            <div className="search-page-container">
                <form onSubmit={this.handleSearch}>
                    <input className="search-page-search" type="text" value={this.state.searchQuery} onChange={this.handleSearchChange} placeholder="Search..."/>
                </form>

                {this.state.searchResults.Users.length === 0? <></> : <div className="search-results search-page-users">
                    {this.state.searchResults.Users.map(user => <UserPreview key={user.UserID} username={user.Name} description={user.Description} userId={user.UserID}/>)}
                </div>}
                {this.state.searchResults.Videos.length === 0? <></> : <div className="search-results search-page-videos">
                    {this.state.searchResults.Videos.map(video => <VideoPreview key={video.UUID} uuid={video.UUID} title={video.Title} creator_id={video.UserID}/>)}
                </div>}
            </div>
        )
    }
}