/*
 ** routeCodes.js
 ** Schema and model for routes that are fetched from 511xmlfetcher
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//routeName is specific route code (ex. 38, 1BX, 3, etc.)
//routeDir is direction (Inbound or Outbound)
//routeStop contains stopCodes for each RouteName & routeDirection (ex. 14X Inbound)
var routeSchema = new Schema({
  routeName: String,
  routeDir: String,
  routeStop: Array
});

var Route = mongoose.model('Route', routeSchema);

module.exports = mongoose.model('Route', Schema);


