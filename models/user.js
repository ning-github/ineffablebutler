// User Schema

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  username: String,
  password: String,
  email: String,
  gender: String,
  address: String
});

UserSchema.plugin(findOrCreate);



var User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', Schema);
