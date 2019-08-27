const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/authentication');
const router = new express.Router();
const upload = multer({
    dest: 'images'
});

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

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
    const body = req.body;
    const allowedUpdate = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(body);
    const isValidOperation = updates.every((item) => {return allowedUpdate.includes(item)});

    if (!isValidOperation) {
        return res.status(400).send({error: 'You cannot update this field'});
    };

    try {
        const user = req.user;
        updates.forEach((update) => {
            user[update] = body[update];
        });
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    };
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send(error);
    };
});

module.exports = router;