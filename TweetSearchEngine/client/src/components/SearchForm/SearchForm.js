import { Component } from "react";
import "./SearchForm.css";
import axios from 'axios';

class SearchForm extends Component {

    constructor() {
        super();
        this.host = window.location.hostname;
        this.port = 5000;
    };

    handleTweetSearch = (e) => {
        const query = e.currentTarget.value;
        axios.get(`${this.host}:${this.port}/search/${query}`).then((res) => {
            console.log(res);
        });
    };

    render() {
        return (
            <form className="search" action="" method="get">
                <input
                    type="text"
                    id="search"
                    placeholder="Search tweets"
                    name="search"
                    onChange={this.handleTweetSearch}
                />
                <button
                    type="submit"
                >
                    <i className="fa fa-search"></i>
                </button>
                
            </form>
        )
    }
}

export default SearchForm;