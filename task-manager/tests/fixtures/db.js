require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'testUser',
    email: 'testUser@testing.com',
    password: 'testing101',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userOneTask = {
    _id: new mongoose.Types.ObjectId(),
    description: 'userOneTask',
    completed: false,
    owner: userOneId
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'testUserTwo',
    email: 'testUserTwo@testing.com',
    password: 'testing101',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
};

const userTwoTask = {
    _id: new mongoose.Types.ObjectId(),
    description: 'userTwoTask',
    completed: true,
    owner: userTwoId
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(userOneTask).save();
    await new Task(userTwoTask).save();
};

module.exports = {
    userOne,
    userOneId,
    userOneTask,
    userTwo,
    userTwoId,
    userTwoTask,
    setupDatabase
}