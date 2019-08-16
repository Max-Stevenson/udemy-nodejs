const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to database');    
    };

    const db = client.db(databaseName);

    db.collection('users').findOne({name: 'Max'}, (err, res) => {
        if (err) {
            return console.log('unable to fetch');
        };

        console.log(res);
        
    });
});