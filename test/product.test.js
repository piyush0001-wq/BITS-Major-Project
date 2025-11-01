const request = require('supertest');
const app = require('../app');

describe('Product tests', function() {
  it('GET /api/products without auth returns 401', function(done) {
    request(app).get('/api/products').expect(401, done);
  });
});
