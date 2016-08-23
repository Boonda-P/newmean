'use strict';

/**
 * Module dependencies
 */
var boondapsPolicy = require('../policies/boondaps.server.policy'),
  boondaps = require('../controllers/boondaps.server.controller');

module.exports = function(app) {
  // Boondaps Routes
  app.route('/api/boondaps').all(boondapsPolicy.isAllowed)
    .get(boondaps.list)
    .post(boondaps.create);

  app.route('/api/boondaps/:boondapId').all(boondapsPolicy.isAllowed)
    .get(boondaps.read)
    .put(boondaps.update)
    .delete(boondaps.delete);

  // Finish by binding the Boondap middleware
  app.param('boondapId', boondaps.boondapByID);
};
