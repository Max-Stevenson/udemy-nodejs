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

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        };
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send();
    };
});

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    };

    if (req.query.compleated) {
        match.compleated = req.query.compleated === 'true';
    };
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const allowedUpdate = ['compleated', 'description'];
    const updates = Object.keys(body);
    const isValidOperation = updates.every((item) => {return allowedUpdate.includes(item)});

    if (!isValidOperation) {
        return res.status(400).send({error: "You cannot update this field"});
    };

    try {
        const task = await Task.findOne({_id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        };
        updates.forEach((update) => {
            task[update] = body[update];
        });
        await task.save();
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    };
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send();
        };
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    };
});

module.exports = router;