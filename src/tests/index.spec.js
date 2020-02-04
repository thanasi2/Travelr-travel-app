import 'regenerator-runtime/runtime';
const request = require('supertest');
const app = require('../server/index.js');


describe('Test path "/test"', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.body.url).toBe('http://testurl.com');
    });
});

describe('Test path "/addTrip"', () => {
    test('It should response the POST method', async () => {
        const response = await request(app).post('/addTrip');
        expect(response.statusCode).toBe(200);
    });
});
describe('Test path "/rmvTrip"', () => {
    test('It should response the POST method', async () => {
        const response = await request(app).post('/rmvTrip');
        expect(response.statusCode).toBe(200);
    });
});
