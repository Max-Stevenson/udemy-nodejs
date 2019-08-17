const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const me = new User({
    name: 'Max',
    age: 'dsfs'
});

// me.save().then((res) => {
//     console.log(res);   
// }).catch((err) => {
//     console.log(err);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    compleated: {
        type: Boolean
    }
});

const task = new Task({
    description: 'This is a test task',
    compleated: false
});

task.save().then((res)=>{
    console.log(res); 
}).catch((err)=>{
    console.log(err);
});