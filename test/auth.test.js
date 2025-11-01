const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('Auth tests', function() {
  it('signup missing fields returns 400', function(done) {
    request(app).post('/api/signup').send({ email: 'a@b.com' }).expect(400, done);
  });
  it('login missing fields returns 400', function(done) {
    request(app).post('/api/login').send({ email: 'a@b.com' }).expect(400, done);
  });
});
