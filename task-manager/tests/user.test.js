const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'testUser',
    email: 'testUser@testing.com',
    password: 'testing101'
}

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'test',
        email: 'jestTest@test.com',
        password: 'jestTesting101'
    }).expect(201);
});

test('Should log in existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not log in nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: 'nonexistent@nonexistent.com',
        password: 'doesnotexist'
    }).expect(400);
});