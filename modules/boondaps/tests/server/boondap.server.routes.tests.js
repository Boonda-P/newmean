'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Boondap = mongoose.model('Boondap'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, boondap;

/**
 * Boondap routes tests
 */
describe('Boondap CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Boondap
    user.save(function () {
      boondap = {
        name: 'Boondap name'
      };

      done();
    });
  });

  it('should be able to save a Boondap if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Boondap
        agent.post('/api/boondaps')
          .send(boondap)
          .expect(200)
          .end(function (boondapSaveErr, boondapSaveRes) {
            // Handle Boondap save error
            if (boondapSaveErr) {
              return done(boondapSaveErr);
            }

            // Get a list of Boondaps
            agent.get('/api/boondaps')
              .end(function (boondapsGetErr, boondapsGetRes) {
                // Handle Boondap save error
                if (boondapsGetErr) {
                  return done(boondapsGetErr);
                }

                // Get Boondaps list
                var boondaps = boondapsGetRes.body;

                // Set assertions
                (boondaps[0].user._id).should.equal(userId);
                (boondaps[0].name).should.match('Boondap name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Boondap if not logged in', function (done) {
    agent.post('/api/boondaps')
      .send(boondap)
      .expect(403)
      .end(function (boondapSaveErr, boondapSaveRes) {
        // Call the assertion callback
        done(boondapSaveErr);
      });
  });

  it('should not be able to save an Boondap if no name is provided', function (done) {
    // Invalidate name field
    boondap.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Boondap
        agent.post('/api/boondaps')
          .send(boondap)
          .expect(400)
          .end(function (boondapSaveErr, boondapSaveRes) {
            // Set message assertion
            (boondapSaveRes.body.message).should.match('Please fill Boondap name');

            // Handle Boondap save error
            done(boondapSaveErr);
          });
      });
  });

  it('should be able to update an Boondap if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Boondap
        agent.post('/api/boondaps')
          .send(boondap)
          .expect(200)
          .end(function (boondapSaveErr, boondapSaveRes) {
            // Handle Boondap save error
            if (boondapSaveErr) {
              return done(boondapSaveErr);
            }

            // Update Boondap name
            boondap.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Boondap
            agent.put('/api/boondaps/' + boondapSaveRes.body._id)
              .send(boondap)
              .expect(200)
              .end(function (boondapUpdateErr, boondapUpdateRes) {
                // Handle Boondap update error
                if (boondapUpdateErr) {
                  return done(boondapUpdateErr);
                }

                // Set assertions
                (boondapUpdateRes.body._id).should.equal(boondapSaveRes.body._id);
                (boondapUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Boondaps if not signed in', function (done) {
    // Create new Boondap model instance
    var boondapObj = new Boondap(boondap);

    // Save the boondap
    boondapObj.save(function () {
      // Request Boondaps
      request(app).get('/api/boondaps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Boondap if not signed in', function (done) {
    // Create new Boondap model instance
    var boondapObj = new Boondap(boondap);

    // Save the Boondap
    boondapObj.save(function () {
      request(app).get('/api/boondaps/' + boondapObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', boondap.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Boondap with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/boondaps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Boondap is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Boondap which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Boondap
    request(app).get('/api/boondaps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Boondap with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Boondap if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Boondap
        agent.post('/api/boondaps')
          .send(boondap)
          .expect(200)
          .end(function (boondapSaveErr, boondapSaveRes) {
            // Handle Boondap save error
            if (boondapSaveErr) {
              return done(boondapSaveErr);
            }

            // Delete an existing Boondap
            agent.delete('/api/boondaps/' + boondapSaveRes.body._id)
              .send(boondap)
              .expect(200)
              .end(function (boondapDeleteErr, boondapDeleteRes) {
                // Handle boondap error error
                if (boondapDeleteErr) {
                  return done(boondapDeleteErr);
                }

                // Set assertions
                (boondapDeleteRes.body._id).should.equal(boondapSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Boondap if not signed in', function (done) {
    // Set Boondap user
    boondap.user = user;

    // Create new Boondap model instance
    var boondapObj = new Boondap(boondap);

    // Save the Boondap
    boondapObj.save(function () {
      // Try deleting Boondap
      request(app).delete('/api/boondaps/' + boondapObj._id)
        .expect(403)
        .end(function (boondapDeleteErr, boondapDeleteRes) {
          // Set message assertion
          (boondapDeleteRes.body.message).should.match('User is not authorized');

          // Handle Boondap error error
          done(boondapDeleteErr);
        });

    });
  });

  it('should be able to get a single Boondap that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Boondap
          agent.post('/api/boondaps')
            .send(boondap)
            .expect(200)
            .end(function (boondapSaveErr, boondapSaveRes) {
              // Handle Boondap save error
              if (boondapSaveErr) {
                return done(boondapSaveErr);
              }

              // Set assertions on new Boondap
              (boondapSaveRes.body.name).should.equal(boondap.name);
              should.exist(boondapSaveRes.body.user);
              should.equal(boondapSaveRes.body.user._id, orphanId);

              // force the Boondap to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Boondap
                    agent.get('/api/boondaps/' + boondapSaveRes.body._id)
                      .expect(200)
                      .end(function (boondapInfoErr, boondapInfoRes) {
                        // Handle Boondap error
                        if (boondapInfoErr) {
                          return done(boondapInfoErr);
                        }

                        // Set assertions
                        (boondapInfoRes.body._id).should.equal(boondapSaveRes.body._id);
                        (boondapInfoRes.body.name).should.equal(boondap.name);
                        should.equal(boondapInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Boondap.remove().exec(done);
    });
  });
});
