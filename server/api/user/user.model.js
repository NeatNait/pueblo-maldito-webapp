'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  nickname: String,

  /*personal data*/
  born: Date,
  dni: { type: String, uppercase: true },
  postalCode: Number,
  gender: {type: String, enum: ['male', 'female', 'other'], required: true},
  playedSurvivalZombie: { type: Boolean, default: false },

  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {},

  /* user extension */
  created: {
    type: Date,
    default: Date.now
  },
  code: {type: Number, unique: true},
  stats: {
    sanity: {
      type: Number,
      default: 10
    },
    lives: {
      type: Number,
      default: 1
    }
  },
  trialsChecked: [{
    trial: {type: mongoose.Schema.Types.ObjectId, ref: 'Trial'},
    status: {
      type: String,
      default: 'checkin'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  trials: [{
    trial: {type: mongoose.Schema.Types.ObjectId, ref: 'Trial'},
    status: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});
/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

//TODO : set random password for new user by admin
// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

// Validate code is not taken
UserSchema
  .path('code')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({code: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified code is already in use.');

// Validate nickname is not taken
UserSchema
  .path('nickname')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({nickname: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified nickname is already in use.');

// Validate dni is not taken
UserSchema
  .path('dni')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({dni: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified dni is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    /* Blank password new user */
    if(!validatePresenceOf(this.hashedPassword)){

      this._password = createRandomPassword();
      this.salt = this.makeSalt();
      this.hashedPassword = this.encryptPassword(this._password);

    }

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};


function createRandomPassword(){
  return Math.random().toString(36).substring(7);
}

module.exports = mongoose.model('User', UserSchema);
