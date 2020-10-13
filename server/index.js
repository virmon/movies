const express = require('express');
const mongoose = require('mongoose');
const posts = require('./routes/posts');
const app = express();

mongoose.connect('mongodb://localhost/blog')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/', posts);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));