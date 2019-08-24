const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/authentication');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(500).send(error);
    };
});

router.post('/users/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send();
    };
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    };
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    };
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
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