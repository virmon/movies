if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB ✅'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000)
