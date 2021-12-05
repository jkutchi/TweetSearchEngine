import "./SearchResult.css";
function SearchResult(props) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    var text = props.tweet._source.text;

    var wiki_url;
    var wiki_text;

    if (props.tweet._source.named_entities.length) {
        // Check if the "named_entities" property exists.
        if (props.tweet._source.named_entities[0].wiki_url) {
            // If the "wiki_url" property exists, set it.
            wiki_url=props.tweet._source.named_entities[0].wiki_url;
        }
        
        if (props.tweet._source.named_entities[0].text) {
            // If the the "wiki_text" propery exists, set it.
            wiki_text=props.tweet._source.named_entities[0].text;
        }
    }
    
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

    var renderWikiLink;

    if (wiki_url) {
        renderWikiLink = <div><b>Wikipedia URL:</b> <a href={wiki_url} target="_blank">{wiki_text}</a></div>
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
                <p><b>Text:</b> {text}</p>
                <p><b>Username:</b> {username}</p>
                <p><b>Timestamp:</b> {timestamp.toUTCString()}</p>
                {location}
                {renderWikiLink}
                <button className="more-info" onClick={handleClick}>More Info</button>
            </div>
        </>
    );
}

export default SearchResult;