import "./SearchResult.css";

function SearchResult(props) {

    console.log(props);

    var text = props.tweet.text;

    var wiki_url;
    var wiki_text;

    if (props.tweet.named_entities.length) {
        if (props.tweet.named_entities[0].wiki_url) {
            wiki_url=props.tweet.named_entities[0].wiki_url;
        }
        
        if (props.tweet.named_entities[0].text) {
            wiki_text=props.tweet.named_entities[0].text;
        }
    }
    
    var username=props.tweet.user.screen_name;

    var renderWikiLink;

    if (wiki_url) {
        renderWikiLink = <div><b>Wikipedia URL:</b> <a href={wiki_url} target="_blank">{wiki_text}</a></div>
    }

    return (
        <div class="search-result">
            <p><b>Text:</b> {text}</p>
            <p><b >Username:</b> {username}</p>
            {renderWikiLink}
            
        </div>
    );
}

export default SearchResult;