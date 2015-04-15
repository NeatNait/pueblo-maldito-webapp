'use strict';

var User = require('./user.model');
var Trial = require('../trial/trial.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');


var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Get public profile
 */
exports.userByCode = function(req, res, next) {

  User.findOne({
    code : req.params.code
  },'-salt -hashedPassword -name -email', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


function updateStatsByTrial(userStats, trialStats){

  _.each(_.pairs(userStats), function(stat){
    var statName = stat[0],
        statValue = stat[1],
        value = userStats[statName] + trialStats[statName];

    userStats[statName] = (value >= 0) ? value : 0; //avoid negative values
  });

  return userStats;
}

/**
 * Complete in trial in user and trial
 */
exports.completeTrial = function(req, res, next) {

  User.findOne({code : req.params.code}, '-salt -hashedPassword', function (err, user) {

    if (err || !user) return res.send(404);

    var trialPassedStatus = _.find(user.trials, function(trialStatus){
      return trialStatus.trial == req.body.trialId;
    });

    if(!trialPassedStatus){
      Trial.findById(req.body.trialId, function (err, trial){

        if (err || !trial) return res.send(404);

        if(trial.active){

          //stats.toObject() is needed to cast model to obj
          user.stats = updateStatsByTrial(user.stats.toObject(), trial.stats.toObject());

          var trialStatus;
          if(user.stats.sanity){
            trialStatus = 'passed';
          }
          else{
            trialStatus = 'failed';
          }

          user.trials.push({
            trial: req.body.trialId,
            status: trialStatus,
            date: Date.now()
          });

          trial.users.push({
            user: user,
            status: trialStatus
          });
          trial.save();

          user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200, {user:user, trial:trial});
          });
        }
        else{
          //TODO
          res.send(403, err);
        }
      });
    }
    else{
      res.send(202, {user:user});
    }

  });

};


/**
 * Check in trial in user and trial
 */
exports.checkinTrial = function(req, res, next) {

  User.findOne({code : req.params.code}, '-salt -hashedPassword', function (err, user) {

    if (err || !user) return res.send(404);

    var trialPassedStatus = _.find(user.trials, function(trialStatus){
      return trialStatus.trial == req.body.trialId;
    });

    Trial.findById(req.body.trialId, function (err, trial){

      if (err || !trial) return res.send(404);

      if(trial.active){

        user.trialsChecked.push({
          trial: req.body.trialId,
        });

        trial.users.push({
          user: user,
          status: 'checkin'
        });
        trial.save();

        user.save(function(err) {
          if (err) return validationError(res, err);
          res.send(200, {user:user, trial:trial});
        });
      }
      else{
        //TODO
        res.send(403, err);
      }
    });

  });

};

