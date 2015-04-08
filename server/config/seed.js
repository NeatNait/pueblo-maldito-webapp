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

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {

  console.time('populateUsers');
  console.log('populating users...');

  var numUsers = 400,
      users = [];

  for (var i = 0; i < numUsers; i++) {
    users.push({
      provider: 'local',
      name: faker.name.findName(),
      email: 'user'+i+'@test.com',
      password: 'test',
      code: i
    });
  }

  users.push({
    provider: 'local',
    role: 'admin',
    name: 'Admin 1',
    email: '1@1.com',
    password: '1',
    code: 990
  });

  users.push({
    provider: 'local',
    role: 'admin',
    name: 'Admin a',
    email: 'a@a.a',
    password: '1',
    code: 995
  });

  users.push({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    code: 999
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

    var numtrials = 30,
        trials = [];

    for (var i = 0; i < numtrials; i++) {
      trials.push({
        //name: faker.lorem.sentence(),
        name: faker.hacker.verb() + ' ' + faker.hacker.noun(),
        info: faker.hacker.phrase(),
        //info: faker.lorem.paragraph(),
        active: true,
        stats: {
          sanity: faker.random.number({min:-5, max:10})
        },
        event: event
      });
    }

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

