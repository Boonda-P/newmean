'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Boondap = mongoose.model('Boondap'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Boondap
 */
exports.create = function(req, res) {
  var boondap = new Boondap(req.body);
  boondap.user = req.user;

  boondap.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(boondap);
    }
  });
};

/**
 * Show the current Boondap
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var boondap = req.boondap ? req.boondap.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  boondap.isCurrentUserOwner = req.user && boondap.user && boondap.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(boondap);
};

/**
 * Update a Boondap
 */
exports.update = function(req, res) {
  var boondap = req.boondap ;

  boondap = _.extend(boondap , req.body);

  boondap.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(boondap);
    }
  });
};

/**
 * Delete an Boondap
 */
exports.delete = function(req, res) {
  var boondap = req.boondap ;

  boondap.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(boondap);
    }
  });
};

/**
 * List of Boondaps
 */
exports.list = function(req, res) { 
  Boondap.find().sort('-created').populate('user', 'displayName').exec(function(err, boondaps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(boondaps);
    }
  });
};

/**
 * Boondap middleware
 */
exports.boondapByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Boondap is invalid'
    });
  }

  Boondap.findById(id).populate('user', 'displayName').exec(function (err, boondap) {
    if (err) {
      return next(err);
    } else if (!boondap) {
      return res.status(404).send({
        message: 'No Boondap with that identifier has been found'
      });
    }
    req.boondap = boondap;
    next();
  });
};
