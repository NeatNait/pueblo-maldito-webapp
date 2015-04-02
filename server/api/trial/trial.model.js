'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrialSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  stats: {
    sanity: Number
  },
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
});


module.exports = mongoose.model('Trial', TrialSchema);