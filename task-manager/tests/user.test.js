require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

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

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'test',
        email: 'jestTest@test.com',
        password: 'jestTesting101'
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(user.password).not.toBe('jestTesting101');

});

test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)

});

test('Should not log in nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: 'nonexistent@nonexistent.com',
        password: 'doesnotexist'
    }).expect(400);
});

test('Should GET user profile', async() => {
    await request(app).get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not GET user profile for unauthenticated user', async() => {
    await request(app).get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for authenticated user', async() => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not delete account for unauthenticated user', async() => {
    await request(app).delete('/users/me')
    .send()
    .expect(401);
});