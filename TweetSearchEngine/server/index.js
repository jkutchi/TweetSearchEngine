const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const searchRoutes = require('./routes/search');

const port = process.env.PORT || 5000;

const app = express();
app.use('/search', searchRoutes);


app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});