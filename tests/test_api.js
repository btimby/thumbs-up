const { startServer } = require('../lib');

describe('API Server', () => {
    let server;

    beforeEach('', (done) => {
        server = startServer({}, (server) => {
            done();
        });
    });

    afterEach('', (done) => {
        server.close(done);
    });

    it('Can handle a request for a pdf', (done) => {
        done();
    });
})