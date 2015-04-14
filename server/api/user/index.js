'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);

router.put('/:code/trial/complete', auth.hasRole('staff'), controller.completeTrial);
router.put('/:code/trial/checkin', auth.hasRole('staff'), controller.checkinTrial);

router.get('/code/:code', controller.userByCode);

module.exports = router;
