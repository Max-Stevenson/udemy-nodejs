const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    };
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        };
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send();
    };
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    };
});



app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const allowedUpdate = ['compleated', 'description'];
    const updates = Object.keys(body);
    const isValidOperation = updates.every((item) => {return allowedUpdate.includes(item)});

    if (!isValidOperation) {
        return res.status(400).send({error: "You cannot update this field"});
    };

    try {
        const task = await Task.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        if (!task) {
            return res.status(404).send();
        };
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    };
});

app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).send();
        };
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    };
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});