const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const searchRoutes = require('./routes/search');
const summaryRoutes = require('./routes/summary');

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

app.use('/search', searchRoutes);
app.use('/summary', summaryRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});