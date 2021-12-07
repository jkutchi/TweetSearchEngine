const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });
const moment = require("moment");

const index = "tweets";

async function queryTweets(text) {
    const { body } = await client.search({
        index: index,
        body: {
            size: 1000,
            query: {
                bool: {
                    should: [
                        { match: { "text": text } },
                        { match: { "text.english_stemming": text } },
                        { match: { "text.edge_ngram_analyzer": text } },
                        { match: { "geo": text } },
                        { match: { "geo.edge_ngram_analyzer": text } },
                        { match: { "named_entities.text": text } },
                        { match: { "named_entities.text.english_stemming": text } },
                        { match: { "named_entities.text.edge_ngram_analyzer": text } },
                    ]
                }
            },
            sort: [{
                created_at: {
                    order: "asc",
                    format: "yyyy-MM-dd HH:mm:ss"
                }
            }]
        }
    });

    return body.hits.hits;
}

async function getTweetById(id) {
    const { body } = await client.get({
        index: index,
        id: id
    });

    return body;
}

async function addTextQuery(esObject, field, key) {

    var stemmingField = `${field}.english_stemming`;
    var ngramField = `${field}.edge_ngram_analyzer`;

    var shouldQuery = {
        bool: {
            should: [
                { match: { [field]: key } },
                { match: { [stemmingField]: key } },
                { match: { [ngramField]: key } }
            ]
        }
    }

    if ('bool' in esObject.body.query) {
        esObject.body.query.bool.must.push(shouldQuery);
    } else {

        esObject.body.query["bool"] = {
            must: []
        };

        esObject.body.query.bool.must.push(shouldQuery);
    }

    return esObject;
}

async function addQuery(esObject, field, key) {
    var mustQuery = { match: { [field]: key } };

    if ('bool' in esObject.body.query) {
        esObject.body.query.bool.must.push(mustQuery);
    } else {
        esObject.body.query["bool"] = {
            must: []
        };

        esObject.body.query.bool.must.push(mustQuery);
    }

    return esObject;
}

async function addLocationQuery(esObject, field, key) {
    var ngramField = `${field}.edge_ngram_analyzer`;

    var locationQuery = {
        bool: {
            should: [
                { match: { [field]: key } },
                { match: { [ngramField]: key } }
            ]
        }
    }

    if ('bool' in esObject.body.query) {
        esObject.body.query.bool.must.push(locationQuery);
    } else {

        esObject.body.query["bool"] = {
            must: []
        };

        esObject.body.query.bool.must.push(locationQuery);
    }

    return esObject;
}

async function addDateRange(esObject, field, startDate, endDate) {
    startDate = moment(startDate).format("YYYY-MM-DD hh:mm:ss");
    endDate = moment(endDate).format("YYYY-MM-DD hh:mm:ss");

    var dateQuery = { range: {
        [field] : {
            gte: startDate,
            lte: endDate
        }
    }};

    if ('bool' in esObject.body.query) {
        esObject.body.query.bool.must.push(dateQuery);
    } else {
        esObject.body.query["bool"] = {
            must: []
        };

        esObject.body.query.bool.must.push(dateQuery);
    }

    return esObject;
}

async function advancedQuery(data) {
    const text = data.params.text;
    const topic = data.params.topic;
    const location = data.params.location;
    const sentiment = data.params.sentiment;
    const startDate = data.params.startDate;
    const endDate = data.params.endDate;

    var esObject = {
        index: index,
        body: {
            size: 1000,
            query: {}
        }
    };

    if (text !== ' ')
        esObject = await addTextQuery(esObject, "text", text);
    if(topic !== ' ')
        esObject = await addQuery(esObject, "named_entities.text", topic);
    if (location !== ' ')
        esObject = await addLocationQuery(esObject, "geo", location);
    if (sentiment !== ' ')
        esObject = await addQuery(esObject, "sentiment", sentiment);
    if (startDate !== ' ' && endDate !== ' ')
        esObject = await addDateRange(esObject, "created_at", startDate, endDate);

    const { body } = await client.search(esObject);

    return body.hits.hits;
}

async function getTweetsAdvanced(req, res) {
    try {
        const results = await advancedQuery(req);
        res.send(results);
    } catch (error) {
        console.log(error);
    }
}

async function getTweets(req, res) {
    try {
        const results = await queryTweets(req.params.query);
        res.send(results);
    } catch (error) {
        console.log(error);
    }
}

async function getTweet(req, res) {
    try {
        const result = await getTweetById(req.params.id);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getTweets, getTweet, getTweetsAdvanced };