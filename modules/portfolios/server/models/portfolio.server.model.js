'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Portfolio Schema
 */
var PortfolioSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Work name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  link: {
    type: String,
    default: '',
    required: 'Please add link'
  },
  leftimage: {
    type: String,
    default: '',
    required: 'Please add Left Image'
  },
  rightimage: {
    type: String,
    default: '',
    required: 'Please add Right Image'
  }
});

mongoose.model('Portfolio', PortfolioSchema);
