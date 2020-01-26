import 'regenerator-runtime/runtime';
const api = require('../server/API.js');
var httpMocks = require('node-mocks-http');



describe('Test to send request to API and get response' , () => {
    test('Should return status code 200', async () => {
      const req = httpMocks.createRequest({body:{'url': 'https://www.freecodecamp.org/news/what-programming-language-should-i-learn-first-19a33b0a467d/'}});

      const res = httpMocks.createResponse();

      api.apiRes(req, res);

      expect(res._getStatusCode()).toBe(200);
    });
});
