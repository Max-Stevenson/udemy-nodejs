const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        };
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const allowedUpdate = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(body);
    const isValidOperation = updates.every((item) => {return allowedUpdate.includes(item)});

    if (!isValidOperation) {
        return res.status(400).send({error: 'You cannot update this field'});
    };

    try {
        const user = await User.findById(_id);
        updates.forEach((update) => {
            user[update] = body[update];
        });
        await user.save();
        if (!user) {
            return res.status(404).send();
        };
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        };
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    };
});

module.exports = router;