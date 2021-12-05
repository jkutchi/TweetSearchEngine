import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function SummaryPage() {
    const host = window.location.hostname;
    const port = 5000;
    const search = useLocation().search;
    const [tweet, setTweet] = useState({});
    const [text, setText] = useState("");

    var [renderChildren, setRenderChildren] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(search).get('id');

        axios.get(`http://${host}:${port}/summary/${id}`).then((res) => {
            console.log(tweet);
            tweet = res.data._source;
            setTweet(tweet);
            setText(tweet.text);

            setRenderChildren(true);
        });

    }, []);

    return (
        <>
        {
            renderChildren ? 
            <>
                <h1>{text}</h1>
            </> 
            : "Loading"
        }
        </>
    );
}

export default SummaryPage;