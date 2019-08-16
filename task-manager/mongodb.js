const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to database');    
    };

    const db = client.db(databaseName);

    db.collection('New Tasks').insertMany([
        {
            description: 'test task one',
            compleated: false
        },
        {
            description: 'test task two',
            compleated: true
        },
        {
            description: 'test task three',
            compleated: false
        }
    ], (err, res) => {
        if (err) {
            return console.log('unable to add items to database');
        };
        console.log(res.ops);
    });
});