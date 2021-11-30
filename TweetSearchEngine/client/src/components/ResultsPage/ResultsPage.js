import SearchForm from "../SearchForm/SearchForm";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import SearchResult from "../SearchResult/SearchResult";
import "./ResultsPage.css";
import { ReactDOM } from "react";

function Tweets({ currentTweets }) {
    return (
        <>
            {
                currentTweets.map((tweet) => 
                
                <SearchResult
                    tweet={tweet._source}
                />
                )
            }
        </>
    );
}


function ResultsPage() {
    const tweetsPerPage = 10;
    const search = useLocation().search;
    const host = window.location.hostname;
    const port = 5000;
    var [tweets, setTweets] = useState([]);
    const [currentTweets, setCurrentTweets] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [tweetOffset, setTweetOffset] = useState(0);

    useEffect(() => {
        const endOffset = tweetOffset + tweetsPerPage;
        const query = new URLSearchParams(search).get('q');

        axios.get(`http://${host}:${port}/search/${query}`).then((res) => {
          setTweets(res.data);
          setCurrentTweets(res.data.slice(tweetOffset, endOffset));
          setPageCount(Math.ceil(res.data.length / tweetsPerPage));
      });

      }, [tweetOffset, tweetsPerPage]);
      
    function handlePageClick(e) {
        const newOffset = (e.selected * tweetsPerPage) % tweets.length;
        setTweetOffset(newOffset);
    }

    return (
        <div class="results">
            <SearchForm /><br/><br/><br/>
            <Tweets currentTweets={currentTweets} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </div>
    );
}

export default ResultsPage;
