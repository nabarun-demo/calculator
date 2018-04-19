const nock = require('nock');

nock('http://localhost:5000')
  .get('/book')
  .reply(200, {
    message: 'Success',
    data: []
  })
  .post('/book')
  .reply(200, function(uri, requestBody) {
    return requestBody;
  });

module.exports = nock;
