const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function queryTweets(text) {
    const { body } = await client.search({
        index: 'tweets',
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

async function getTweets(req, res) {
    const results = await queryTweets(req.params.query);
    res.send(results);
}

module.exports = { getTweets };