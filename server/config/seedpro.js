/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';


var User = require('../api/user/user.model');

var admin = new User({
  provider: 'local',
  role: 'admin',
  name: 'Admin 1',
  email: '1@1.com',
  password: '1',
  code: 990,
  gender: 'male'
}).save();

