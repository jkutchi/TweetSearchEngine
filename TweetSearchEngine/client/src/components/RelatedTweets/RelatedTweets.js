import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

function RenderRelatedTweets(tweets, id, startDate, endDate, location) {
    const host = window.location.hostname;
    const port = 3000;

    tweets = tweets.filter((tweet) => {
        return tweet._id != id;
    });

    startDate = moment(startDate).format("MM/DD/YYYY");
    endDate = moment(endDate).format("MM/DD/YYYY");

    var renderTweets =
        <>
        <h3><u>Tweets Posted From {location} Within the Time Range: {startDate} - {endDate}</u></h3>
            <div className="row">
                {
                    tweets.map((tweet) =>
                        <div className="col-lg-6 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{tweet._source.text}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">By {tweet._source.user.screen_name}</Card.Subtitle>
                                    <Card.Link href={`http://${host}:${port}/summary/?id=${tweet._id}`}>Visit Summary</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
            </div>
        </>
    
    return tweets.length ? renderTweets : "";
}

function RelatedTweets(props) {
    const host = window.location.hostname;
    const port = 5000;

    var startDate = moment(props.timestamp, "YYYY-MM-DD hh:mm:ss").subtract(30, 'days');
    var endDate = moment(props.timestamp, "YYYY-MM-DD hh:mm:ss").add(30, 'days');
    
    const [relatedTweets, setRelatedTweets] = useState([]);

    useEffect(() => {
        axios.get(`http://${host}:${port}/advancedSearch/%20/%20/${props.location}/%20/${startDate}/${endDate}`).then((res) => {
            setRelatedTweets(res.data);
        });
    }, [])

   return (
       <>
        {RenderRelatedTweets(relatedTweets, props.id, startDate, endDate, props.location)}
       </>
   );
}

export default RelatedTweets;