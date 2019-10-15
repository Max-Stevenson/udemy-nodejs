const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { userOne, 
    userOneTask, 
    userOneId, 
    userTwo, 
    userTwoTask, 
    setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app).post('/tasks')
   .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
   .send({
       description: 'testing',
       compleated: false
   })
   .expect(201);

   const task = await Task.findById(response.body._id);
   expect(task).not.toBeNull();
   expect(task.compleated).toBe(false);
});

test('Should retrieve user one\'s tasks', async () => {
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    expect(response.body.length).toEqual(1);
});

test('User two cannot delete user one task', async () => {
    const response = await request(app).delete(`/tasks/${userOneTask._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

    const task = await Task.findById(userOneTask._id);
    expect(task).not.toBeNull;
});