/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Trial = require('../api/trial/trial.model');
var Event = require('../api/event/event.model');
var User = require('../api/user/user.model');
var faker = require('faker');
faker.locale = 'es';

User.find({}).remove(function() {

  console.time('populateUsers');
  console.log('populating users...');

  var numUsers = 400,
      users = [];

  for (var i = 0; i < numUsers; i++) {
    users.push({
      provider: 'local',
      name: faker.name.findName(),
      nickname: faker.internet.userName(),
      email: 'user'+i+'@test.com',
      password: 'test',
      code: i,
      gender: 'male'
    });
  }

  users.push({
    provider: 'local',
    role: 'admin',
    name: 'Admin 1',
    email: '1@1.com',
    password: '1',
    code: 990,
    gender: 'male'
  });

  users.push({
    provider: 'local',
    role: 'admin',
    name: 'Admin a',
    email: 'a@a.a',
    password: '1',
    code: 995,
    gender: 'male'
  });

  users.push({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    code: 999,
    gender: 'male'
  });

  users.push({
    provider: 'local',
    role: 'staff',
    name: 'Staff',
    email: 'staff@staff.com',
    password: 'staff',
    code: 985,
    gender: 'male'
  });

  users.push({
    provider: 'local',
    role: 'staff',
    name: 'Staff 2',
    email: '2@2.com',
    password: '2',
    code: 980,
    gender: 'male'
  });

  User.create(users, function(err, docs) {
    if(err){
      console.log(err);
    }
    console.log('finished populating users');
    console.timeEnd('populateUsers');
  });

});

Event.find({}).remove(function() {

  console.time('populateEvents');
  console.log('populating events...');

  Event.create({
    name: faker.lorem.sentence(),
    info: faker.lorem.paragraph(),
    active: true,
    startDate: Date.now(),
    finishDate: faker.date.future(),
    type: faker.lorem.words()[0]
  }, function(err, event) {

    console.log('finished populating events');
    console.timeEnd('populateEvents');

    if(err){
      console.log(err);
      return;
    }
    createTrials(event);
  });

});

function createTrials(event){
  Trial.find({}).remove(function() {

    console.time('populateTrials');
    console.log('populating trials...');

    var numtrials = 40,
        numdeaths = 15,
        trials = [];

    for (var i = 0; i < numtrials; i++) {

      trials.push({
        //name: faker.lorem.sentence(),
        name: faker.hacker.verb() + ' ' + faker.hacker.noun(),
        info: faker.hacker.phrase(),
        //info: faker.lorem.paragraph(),
        active: true,
        type: i%4 === 0 ? 'Award' : 'Trial',
        stats: {
          sanity: faker.random.number({min:-10, max:10})
        },
        event: event
      });
    }

    for (var i = 0; i < numdeaths; i++) {

      var name = faker.hacker.adjective() + ' ' + faker.hacker.noun();
      trials.push({
        //name: faker.lorem.sentence(),
        name: name,
        info: 'Killed by a ' + name + '!',
        //info: faker.lorem.paragraph(),
        active: true,
        type: 'Death',
        stats: {
          sanity: -1000,
          lives: -1000
        },
        event: event
      });
    }


    trials.push({
      name: '_Death!',
      info: faker.hacker.phrase(),
      active: true,
      type: 'Death',
      stats: {
        sanity: -1000,
        lives: -1000
      },
      event: event
    })

    Trial.create(trials, function(err, docs) {
      if(err){
        console.log(err);
        return;
      }
      console.log('finished populating trials');
      console.timeEnd('populateTrials');
    });

  });
}

