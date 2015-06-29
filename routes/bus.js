var express = require('express');
var app = express();
var busRouter = express.Router();
var request = require('request');
var RouteDB = require('../models/routeCodes.js');
var cleanStopName = function (stopName) {
  var i;
  var cleaned = stopName.split('');
  for (i = 0; i < cleaned.length; i++) {
    if (stopName[i] === "'") {
      cleaned.splice(i, 1);
    } else if (stopName[i] === "&") {
      cleaned.splice(i, 1, 'and');
    }
  }
  cleaned = cleaned.join('');
  console.log(cleaned);
  return cleaned;
};
var getXMLFrom511 = function (direction, stopName, stopCode, callback) {
  var APItoken = 'e04385aa-cdb9-4f5b-9d78-9c7e0dcb7260';
  var endpoint = 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=' + APItoken + '&stopCode=' + stopCode;
  var xml;
  request(endpoint, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode === 200) {
      xml = body;
      callback(xml);
    }
  });
};
var queryRouteDB = function (busNumber, direction, stopName) {
  var promise = RouteDB.find({
    "routeName": busNumber,
    "routeDir": direction,
    "routeStop.name": stopName
  }, {
    "routeStop": {
      $elemMatch: {
        "name": stopName
      }
    }
  }, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    }
  }).exec();
  return promise;
};
busRouter.get('/:number/:direction/:stopname', function (req, res) {
  console.log(req, res);
  var busStopInfos = {
    number: req.params.number,
    direction: req.params.direction,
    stopname: req.params.stopname
  };
  // BusDb.find(busStopInfos, function (err, busInfo) {
  //   if (err) {
  //     console.log("bus error:", err);
  //   }
  //   // api query and in callback send response 
  //   // res.status(200).send({
  //   //   number: "busInfo.something form api",
  //   //   direction: "busInfo.something form api",
  //   //   stopname: "busInfo.something form api"
  //   // });
  //   console.log('busInfo: ', busInfo);
  // });
});
busRouter.post('/', function (req, res) {
  var busNumber = req.body.busNumber;
  var stopName = cleanStopName(req.body.stopName);
  var direction = req.body.direction;
  var promise = queryRouteDB(req.body.busNumber, req.body.direction, stopName);
  var sendResponse = function (xml) {
    res.status(200).send({
      xml: xml,
      busNumber: busNumber,
      direction: direction,
      stopName: stopName
    });
  };
  promise.then(function (stopCode) {
    var stopCode = stopCode[0]["routeStop"][0]["StopCode"];
    var xml = getXMLFrom511(direction, stopName, stopCode, function (xml) {
      sendResponse(xml);
    });
  });
});
module.exports = busRouter;
