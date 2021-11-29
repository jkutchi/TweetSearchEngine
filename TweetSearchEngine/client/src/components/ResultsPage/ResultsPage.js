import SearchForm from "../SearchForm/SearchForm";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";
import "./ResultsPage.css";


function ResultsPage() {
    const search = useLocation().search;
    const host = window.location.hostname;
    const port = 5000;
    var [tweets, setTweets] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(search).get('q');

        axios.get(`http://${host}:${port}/search/${query}`).then((res) => {
          setTweets(res.data);
      });

      }, []);


    return (
        <div class="results">
            <SearchForm /><br/><br/><br/>
        
            {
            tweets.map((tweet) => 
                
                <SearchResult
                    tweet={tweet._source}
                />
            )
            }

        </div>
    );
}

export default ResultsPage;
