const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

// experss middlewares
app.use(cors());

const port = process.env.PORT || 3000;

app.post('/user/auth', (req, res) => {
    res.json('hello');
});

app.post('/user/signup', (req, res) => {
    res.json('hello');
});

app.listen(port, () => {
    console.log('App listening on port : ', port);
});