// Route Stop
//GetStopsforRoute

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = new Schema({
  routeName: String,
  routeDir: String,
  routeStop: Array
});

var Route = mongoose.model('Route', routeSchema);

module.exports = mongoose.model('Route', Schema);


