function SearchResult(props) {
    return (
        <div>
            <p><b>Text:</b> {props.text}</p>
            <p><b >Username:</b> {props.username}</p>
            <a href={props.wiki_url}>{props.wiki_text}</a>
        </div>
    );
}

export default SearchResult;