require('dotenv').config();
const mongoose = require('mongoose');

const datbase = (process.env.NODE_ENV === 'development' ? process.env.MONGODB_URL : process.env.MONGODB_URL_TEST)

mongoose.connect(datbase, {
    useNewUrlParser: true,
    useCreateIndex: true
});