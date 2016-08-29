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
    required: 'Please fill work name',
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
  mobileimage: {
    type: String,
    default: '',
    required: 'Please add mobile image'
  },
  desktopimage: {
    type: String,
    default: '',
    required: 'Please add desktop image'
  },
  picture: {
    type: String,
    default: '',
    required: 'Please add picture'
  },
  description: {
    type: String,
    default: '',
    required: 'Please add description'
  }
});

mongoose.model('Portfolio', PortfolioSchema);
