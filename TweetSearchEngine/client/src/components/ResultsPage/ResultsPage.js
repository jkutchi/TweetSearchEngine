import SearchForm from "../SearchForm/SearchForm";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import SearchResult from "../SearchResult/SearchResult";
import AdvancedSearchPanel from "../AdvancedSearchPanel/AdvancedSearchPanel";
import "./ResultsPage.css";
import { ReactDOM } from "react";

var monthAndYear = "";
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

/**
 * 
 * @param {month and year string} newMonthAndYear 
 * @returns true if month and year has changed
 */
function displayMonthAndYear(newMonthAndYear) {
    if (monthAndYear != newMonthAndYear) {
        monthAndYear = newMonthAndYear;
        return true;
    } else {
        return false;
    }
}

function Tweets({ currentTweets }) {

    return (
        <>
            {
                currentTweets.map((tweet) => (
                    <SearchResult
                        tweet={tweet}
                        displayMonthAndYear={displayMonthAndYear(monthNames[new Date(tweet._source.created_at).getMonth()] + " " 
                        + new Date(tweet._source.created_at).getFullYear())}
                    />
                    )
                )
            }
        </>
    );
}


function ResultsPage() {
    const tweetsPerPage = 10;
    const search = useLocation().search;
    const host = window.location.hostname;

    const port1 = 3000;
    const port2 = 5000;
    
    const [currentTweets, setCurrentTweets] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [query, setQuery] = useState("");

    useEffect(() => {

        // Get and set query parameters.
        const tempQuery = new URLSearchParams(search).get('q');
        setQuery(tempQuery);

        axios.get(`http://${host}:${port2}/search/${tempQuery}`).then((res) => {

            // Get and set the active page.
            const currentPage = new URLSearchParams(search).get('page');
            setActivePage(currentPage);

            let tweetOffset = ((currentPage - 1) * tweetsPerPage) % res.data.length;
            let endOffset = tweetOffset + tweetsPerPage;

            setCurrentTweets(res.data.slice(tweetOffset, endOffset));
            setPageCount(Math.ceil(res.data.length / tweetsPerPage));
      });

      }, []);
      
    function handlePageClick(e) {
        let newPage = e.selected + 1;
        window.location.href = `http://${host}:${port1}/results/?page=${newPage}&q=${query}`;
    }

    return (
        <div className="results">
            <SearchForm /><br/><br/><br/><br/><br/>
            <div className="rowC">
                <div style={{width: "50%"}}>
                    <Tweets currentTweets={currentTweets} />
                </div>
                <AdvancedSearchPanel />
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
                forcePage={activePage - 1}
            />
        </div>
    );
}

export default ResultsPage;
