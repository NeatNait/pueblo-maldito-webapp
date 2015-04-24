'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrialSchema = new Schema({
  name: String,
  info: String,
  active: {
    type: String,
    default: 'active'
  }
  type: String,
  stats: {
    sanity: Number,
    lives: {
      type: Number,
      default: 0
    }
  },
  users: [{
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
});


module.exports = mongoose.model('Trial', TrialSchema);