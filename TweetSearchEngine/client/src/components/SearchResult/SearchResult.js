import "./SearchResult.css";

function SearchResult(props) {

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

    // Convert the timestamp to a more human readable form.
    var timestamp = new Date(props.tweet.created_at).toUTCString();

    var location = props.tweet.user.location;

    var renderWikiLink;

    if (wiki_url) {
        renderWikiLink = <div><b>Wikipedia URL:</b> <a href={wiki_url} target="_blank">{wiki_text}</a></div>
    }

    return (
        <div class="search-result">
            <p><b>Text:</b> {text}</p>
            <p><b>Username:</b> {username}</p>
            <p><b>Timestamp:</b> {timestamp}</p>
            <p><b>Location:</b> {location}</p>
            {renderWikiLink}
            
        </div>
    );
}

export default SearchResult;