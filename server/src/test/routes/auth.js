/* eslint-disable */

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { sleep } = require('../../utils/utils');

chai.use(chaiHttp);
const server = require('../../app');

describe('Auth', () => {
  before(async () => {
    const db = require('../../models');
    db.sequelize.sync({ force: true });

    return await sleep(1000);
  });

  /*
 * Test the /signup route
 */
  describe('/POST signup', () => {
    it('it should POST a user', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({
          email: 'test@test.pt',
          password: '12345'
        })
        .end((_, res) => {
          res.should.have.status(200);
          const { email, username } = res.body.user;
          chai.assert.equal(email, 'test@test.pt');
          done();
        });
    });

    it('it should not POST a user bc email exists ', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({
          email: 'test@test.pt',
          password: '12345'
        })
        .end((_, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.text, 'User already exists');
          done();
        });
    });

    it('it should not POST a user bc password is not given ', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send({
          email: 'test3@test.pt'
        })
        .end((_, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.text, 'Missing credentials');
          done();
        });
    });
  });

  /*
     * Test the /login route
     */
  describe('/POST login', () => {
    it('it should POST a user to login and retrieve token', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({
          email: 'test@test.pt',
          password: '12345',
        })
        .end((_, res) => {
          res.should.have.status(200);
          chai.expect(res.token).to.not.be.null;
          done();
        });
    });
    it('it should not POST a user bc invalid email', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({
          email: 'test9@test.pt',
          password: '12345',
        })
        .end((_, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.text, 'User not found');
          done();
        });
    });
    it('it should POST a user bc invalid password', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({
          email: 'test@test.pt',
          password: '123456',
        })
        .end((_, res) => {
          res.should.have.status(400);
          chai.assert.equal(res.text, 'Wrong Password');
          done();
        });
    });
  });
});
