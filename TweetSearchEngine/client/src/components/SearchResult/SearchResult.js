import "./SearchResult.css";

function SearchResult(props) {

    var renderWikiLink;

    if (props.wiki_url) {
        renderWikiLink = <div><b>Wikipedia URL:</b> <a href={props.wiki_url} target="_blank">{props.wiki_text}</a></div>
    }

    return (
        <div class="search-result">
            <p><b>Text:</b> {props.text}</p>
            <p><b >Username:</b> {props.username}</p>
            {renderWikiLink}
            
        </div>
    );
}

export default SearchResult;