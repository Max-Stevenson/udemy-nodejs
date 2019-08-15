const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to database');    
    };
    console.log('connected correctly');
});