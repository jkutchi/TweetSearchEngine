import "./SearchResult.css";
import { TwitterTweetEmbed } from "react-twitter-embed";

function SearchResult(props) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    var text = props.tweet._source.text;

    
    var username = props.tweet._source.user.screen_name;

    var timestamp = new Date(props.tweet._source.created_at);

    var monthAndYear = "";

    // If month and year is set to display, display a header with the month and year.
    if (props.displayMonthAndYear) {
        monthAndYear = <h2><u>{monthNames[timestamp.getMonth()] + " " + timestamp.getFullYear()}</u></h2>
    }
    
    var location = "";

    if (props.tweet._source.user.location) {
        location = <p><b>Location:</b> {props.tweet._source.user.location}</p>
    }

    var host = window.location.hostname;
    var port = 3000;
    var id = props.tweet._id;

    function handleClick() {
        window.location.href = `http://${host}:${port}/summary/?id=${id}`;
    }
    
    return (
        <>
            {monthAndYear}
            <div class="search-result">
                <TwitterTweetEmbed
                    tweetId={props.tweet._source.id.toString()} />
                <p><b>Text:</b> {text}</p>
                <p><b>Username:</b> {username}</p>
                <p><b>Timestamp:</b> {timestamp.toUTCString()}</p>
                {location}
                <button className="more-info" onClick={handleClick}>More Info</button>
            </div>
        </>
    );
}

export default SearchResult;