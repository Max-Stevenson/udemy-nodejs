const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('unable to connect to database');    
    };

    const db = client.db(databaseName);

    db.collection('New Tasks').findOne({_id: new ObjectID('5d566b3345f1251f2b05e5aa')}, (err, res) => {
        if (err) {
            return console.log('unable to fetch');
        };

        console.log(res);
        
    });
    db.collection('New Tasks').find({compleated: false}).toArray((err, res) => {
        console.log(res);
        
    });
});