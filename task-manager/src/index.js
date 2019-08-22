const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc' }, 'tokenize', {expiresIn: '1 hour'});
    console.log(token);
    
    const data = jwt.verify(token, 'tokenize');
    console.log(data);
    
};
myFunction();

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});