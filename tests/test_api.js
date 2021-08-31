const nock = require('nock');
const request = require('supertest');
const { startServer } = require('../lib');
const { OFFICER_URL } = require('../lib/config');

describe('API Server', () => {
  let server;

  beforeEach('', (done) => {
    server = startServer({ port: 0 }, (server) => {
      done();
    });
  });

  afterEach('', (done) => {
    server.close(done);
    nock.cleanAll();
  });

  it('Can handle a health check success', (done) => {
    nock(OFFICER_URL)
      .post('/pdf/')
      .reply(200);
  
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('Can handle a health check failure', (done) => {
    nock(OFFICER_URL)
      .post('/pdf/')
      .reply(500);
  
    request(server)
      .get('/')
      .expect(503, done);
  });

  it('Can handle a request for a pdf', (done) => {
    done();
  });
});