const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

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
                        { match: { "text.edge_ngram_analyzer": text } }
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

module.exports = { getTweets, getTweet };