const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to database');    
    };

    const db = client.db(databaseName);

    const updatePromise = db.collection('users').updateMany({
        age: {$gt:28}},
        {$inc: {age: 1}
    });

    updatePromise.then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
});