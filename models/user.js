// User Schema

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  loginId: String,
  loginMethod: String,
  displayName: String,
  routes: Array
});

UserSchema.plugin(findOrCreate);

var User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', Schema);
