import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TwitterFollowButton, TwitterMentionButton } from "react-twitter-embed";
import axios from "axios";
import "./SummaryPage.css";

function renderUserView(user) {
    return (
        <>
            <h3><u>User</u></h3>
            <b>Username: </b>{user.screen_name}<br/>
            <b>Name: </b>{user.name} <br/>
            <TwitterFollowButton
                screenName={user.screen_name}
            />
        </>
    )
}

function renderWikiLinks(namedEntities) {
    // Filter out in entities that lack a Wikipedia URL.
    var wikis = namedEntities.filter((entity) => {
        return entity.wiki_url !== undefined;
    });

    // If there are Wikipedia links, return a JSX list of Wikipedia links.
    return wikis.length ? 
        <>
        <h3><u>Relevant Wikipedia Links</u></h3>
        <div className="wiki-links">
            <ul>
            {
                wikis.map((entity) => 
                    <li><a href={entity.wiki_url} target="_blank">{entity.text}</a></li>
                )
            }
            </ul>
        </div>
        </> : "";
}

function SummaryPage() {
    const host = window.location.hostname;
    const port = 5000;
    const search = useLocation().search;
    const [tweet, setTweet] = useState({});
    const [text, setText] = useState("");
    const [userView, setUserView] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [location, setLocation] = useState("");
    const [wikiLinks, setWikiLinks] = useState("");

    var [renderChildren, setRenderChildren] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(search).get('id');

        axios.get(`http://${host}:${port}/summary/${id}`).then((res) => {

            const tempTweet = res.data._source;
            console.log(tempTweet);
            setTweet(tempTweet);
            setText(tempTweet.text);
            setUserView(renderUserView(tempTweet.user));
            setTimestamp(new Date(tempTweet.created_at));
            setLocation(tempTweet.geo);
            
            setWikiLinks(renderWikiLinks(tempTweet.named_entities));

            setRenderChildren(true);
        });

    }, []);

    return (
        <div className="center">
        {
            renderChildren ? 
            <>
                <h1>{text}</h1><br/>
                <p><b>Text:</b> {text}</p><br/>
                {userView}<br/><br/>
                {wikiLinks}
            </> 
            : "Loading"
        }
        </div>
    );
}

export default SummaryPage;