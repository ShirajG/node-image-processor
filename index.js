require('dotenv').config();
const express = require('express')
const AWS = require('aws-sdk');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));

