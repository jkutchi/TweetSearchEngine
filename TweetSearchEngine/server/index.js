// const express = require('express');
// const bodyParser = require('body-parser');
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// const searchRoutes = require('./routes/search');
import searchRoutes from './routes/search.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/search', searchRoutes);

// const { Client } = require('@elastic/elasticsearch');
// const client = new Client({ node: 'http://localhost:9200' })

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

console.log(app.get('port'))