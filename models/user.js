/*
 ** user.js
 ** Schema and model for user login to save in database, used in conjunciton with passport.js
 ** Uses findOrCreate plugin (searches database for User,)
 */

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

//User schema that contains loginId, loginMethod (ex. Google), displayName, and routes saved
var UserSchema = new Schema({
  loginId: String,
  loginMethod: String,
  displayName: String,
  routes: Array
});

UserSchema.plugin(findOrCreate);

var User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', Schema);
