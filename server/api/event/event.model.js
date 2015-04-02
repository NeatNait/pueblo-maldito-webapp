'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
   name: String,
  info: String, //Description of the event
  active: Boolean,
  startDate: Date,
  finishDate: Date,
  type: String
});

module.exports = mongoose.model('Event', EventSchema);