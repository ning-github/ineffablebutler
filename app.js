var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var routes = require('./routes/index');
var db = require('./config/db');
var UserDB = require('./models/user');
var RouteDB = require('./models/routeCodes.js');
var googleConfig = require('./config/googleConfig');

var app = express();

var authMethods = [{
  name: 'Google',
  url: '/auth/google'
}];

var user = {};

app.use(logger('dev'));

app.use(cookieParser('mySecretKey'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log("deserializeUser");
  done(null, obj);
});

var saveUser = function (accessToken, refreshToken, profile, done) {
  UserDB.findOrCreate({
    loginId: profile.id,
    loginMethod: profile.provider,
    displayName: profile.displayName
      // , 
      // accessToken: accessToken, 
      // refreshToken: refreshToken
  }, function (err, user, created) {
    console.log("created:", created);
    return done(null, profile);
  });
}

passport.use(new GoogleStrategy(googleConfig,
  function (accessToken, refreshToken, profile, done) {
    saveUser(accessToken, refreshToken, profile, done);
  }));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/auth/google', passport.authenticate('google', {
  scope: 'profile'
}));


app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/hhghg'
  }),
  function (req, res) {
    console.log("made it to callback");
    console.log("req user", req.user);
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//creating session routes
app.get('/api/user', function (req, res) {
  console.log("request user ", req.user);
  if (req.user) {
    UserDB.find({
        displayName: req.user.displayName
      })
      .exec(function (err, user) {
        console.log('exec user: ', user);
        res.status(200).send({
          id: user[0]._id,
          displayName: user[0].displayName,
          routes: user[0].routes
        });
      });
    //logged in
    console.log("loggedin");

  } else {
    //not logged in
    //401 not authenticated
    console.log("not loggedin");
    res.status(401).send({
      error: "not authenticated",
      authMethods: authMethods
    });
  }
});

app.put('/api/user', function (req, res) {
  console.log("request user post ", req.body);
  UserDB.findOneAndUpdate({
      displayName: req.body.displayName
    }, {
      routes: req.body.routes
    }, null,
    function (err, user) {
      if (err) {
        console.log("put error:", err);
      }

      console.log('exec user: ', user);
      res.status(200).send({
        id: user._id,
        displayName: user.displayName,
        routes: user.routes
      });
    });

});

app.get('/api/bus/:number/:direction/:stopname', function (req, res) {
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

app.get('/api/logout', function (req, res) {
  console.log("logout req user ", req.user);
  req.logout();
  req.session.destroy();
  res.status(200).send({
    status: "logged-out"
  });
});

var cleanStopName = function(stopName){
  console.log('in cleanStopName')
  var cleaned = stopName.split('');

  for (var i = 0; i < cleaned.length; i++){
    if (stopName[i] === "'"){
      cleaned.splice(i, 1);
    } else if (stopName[i] === "&") {
      cleaned.splice(i, 1, 'and');
    }
  }
  cleaned = cleaned.join('');
  console.log(cleaned);
  return cleaned;
};


var getXMLFrom511 = function(direction, stopName, stopCode, callback){

  var APItoken = 'e04385aa-cdb9-4f5b-9d78-9c7e0dcb7260';
  var endpoint = 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=' + APItoken + '&stopCode=' + stopCode;
  
  var xml;

  request(endpoint, function (error, response, body) {
    console.log(error);
    if (!error && response.statusCode == 200) {
      xml = body;
      callback(xml);
    }
  });

};

var queryRouteDB = function(busNumber, direction, stopName){
  var promise = RouteDB.find({
    "routeName": busNumber, 
    "routeDir": direction, 
    "routeStop.name": stopName
  }, 
  {
    "routeStop": { 
      $elemMatch: {
        "name": stopName
      }
    }
  }, function(err, result){
    if (err){
      console.log(err);
      throw err;
    }
  }).exec();

  return promise;
};

app.post('/route/times', function(req, res){
  var busNumber = req.body.busNumber;
  var stopName = cleanStopName(req.body.stopName);
  var direction = req.body.direction;
  
  var promise = queryRouteDB(req.body.busNumber, req.body.direction, stopName);

  var sendResponse = function(xml){
    res.status(200).send({xml: xml, busNumber: busNumber, direction: direction, stopName: stopName});  
  };

  promise.then(function(stopCode){
    var stopCode = stopCode[0]["routeStop"][0]["StopCode"];
    
    var xml = getXMLFrom511(direction, stopName, stopCode, function(xml){
      sendResponse(xml);
    });
  });

});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
