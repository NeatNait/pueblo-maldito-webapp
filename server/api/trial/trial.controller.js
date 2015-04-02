'use strict';

var _ = require('lodash');
var Trial = require('./trial.model');

// Get list of trials
exports.index = function(req, res) {
  Trial.find(function (err, trials) {
    if(err) { return handleError(res, err); }
    return res.json(200, trials);
  });
};

// Get a single trial
exports.show = function(req, res) {
  Trial.findById(req.params.id, function (err, trial) {
    if(err) { return handleError(res, err); }
    if(!trial) { return res.send(404); }
    return res.json(trial);
  });
};

// Creates a new trial in the DB.
exports.create = function(req, res) {
  Trial.create(req.body, function(err, trial) {
    if(err) { return handleError(res, err); }
    return res.json(201, trial);
  });
};

// Updates an existing trial in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Trial.findById(req.params.id, function (err, trial) {
    if (err) { return handleError(res, err); }
    if(!trial) { return res.send(404); }
    var updated = _.merge(trial, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, trial);
    });
  });
};

// Deletes a trial from the DB.
exports.destroy = function(req, res) {
  Trial.findById(req.params.id, function (err, trial) {
    if(err) { return handleError(res, err); }
    if(!trial) { return res.send(404); }
    trial.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}