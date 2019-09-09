const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

beforeEach(async() => {
    await User.deleteMany();
});

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'test',
        email: 'jestTest@test.com',
        password: 'jestTesting101'
    }).expect(201);
});