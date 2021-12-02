import "./SearchResult.css";

function SearchResult(props) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    var text = props.tweet.text;

    var wiki_url;
    var wiki_text;

    if (props.tweet.named_entities.length) {
        // Check if the "named_entities" property exists.
        if (props.tweet.named_entities[0].wiki_url) {
            // If the "wiki_url" property exists, set it.
            wiki_url=props.tweet.named_entities[0].wiki_url;
        }
        
        if (props.tweet.named_entities[0].text) {
            // If the the "wiki_text" propery exists, set it.
            wiki_text=props.tweet.named_entities[0].text;
        }
    }
    
    var username = props.tweet.user.screen_name;

    var timestamp = new Date(props.tweet.created_at);

    var monthAndYear = "";

    // If month and year is set to display, display a header with the month and year.
    if (props.displayMonthAndYear) {
        monthAndYear = <h2><u>{monthNames[timestamp.getMonth()] + " " + timestamp.getFullYear()}</u></h2>
    }
    
    var location = props.tweet.user.location;

    var renderWikiLink;

    if (wiki_url) {
        renderWikiLink = <div><b>Wikipedia URL:</b> <a href={wiki_url} target="_blank">{wiki_text}</a></div>
    }

    return (
        <>
            <div class="search-result">
                {monthAndYear}
                <p><b>Text:</b> {text}</p>
                <p><b>Username:</b> {username}</p>
                <p><b>Timestamp:</b> {timestamp.toUTCString()}</p>
                <p><b>Location:</b> {location}</p>
                {renderWikiLink}
                
            </div>
        </>
    );
}

export default SearchResult;