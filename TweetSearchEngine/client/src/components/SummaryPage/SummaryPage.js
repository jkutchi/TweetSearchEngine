import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./SummaryPage.css";

function renderWikiLinks(namedEntities) {
    // Filter out in entities that lack a Wikipedia URL.
    var wikis = namedEntities.filter((entity) => {
        return entity.wiki_url !== undefined;
    });

    // If there are Wikipedia links, return a JSX list of Wikipedia links.
    return wikis.length ? 
        <>
        <h2>Wikipedia Links</h2>
        <ul>
        {
            wikis.map((entity) => 
                <li><a href={entity.wiki_url}>{entity.text}</a></li>
            )
        }
        </ul>
        </> : null;
}

function SummaryPage() {
    const host = window.location.hostname;
    const port = 5000;
    const search = useLocation().search;
    const [tweet, setTweet] = useState({});
    const [text, setText] = useState("");
    const [username, setUsername] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [location, setLocation] = useState("");
    const [wikiLinks, setWikiLinks] = useState("");

    var [renderChildren, setRenderChildren] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(search).get('id');

        axios.get(`http://${host}:${port}/summary/${id}`).then((res) => {

            const tempTweet = res.data._source;

            setTweet(tempTweet);
            setText(tempTweet.text);
            setUsername(tempTweet.username);
            setTimestamp(new Date(tempTweet.created_at));
            setLocation(tempTweet.location);
            
            setWikiLinks(renderWikiLinks(tempTweet.named_entities));

            setRenderChildren(true);
        });

    }, []);

    return (
        <div className="center">
        {
            renderChildren ? 
            <>
                <h1>{text}</h1>
                <p><b>Text:</b> {text}</p>
                <p><b>Username:</b> {username}</p>
                <p><b>Timestamp:</b> {timestamp.toUTCString()}</p>
                {location}
                {wikiLinks}
                
            </> 
            : "Loading"
        }
        </div>
    );
}

export default SummaryPage;