const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/authentication');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.get('/tasks/:id', async (req, res) => {
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

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const allowedUpdate = ['compleated', 'description'];
    const updates = Object.keys(body);
    const isValidOperation = updates.every((item) => {return allowedUpdate.includes(item)});

    if (!isValidOperation) {
        return res.status(400).send({error: "You cannot update this field"});
    };

    try {
        const task = await Task.findById(_id);
        updates.forEach((update) => {
            task[update] = body[update];
        });
        await task.save();

        if (!task) {
            return res.status(404).send();
        };
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    };
});

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;