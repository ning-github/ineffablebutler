var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var routes = require('./routes/index');
var db = require('./config/db');
var UserDB = require('./models/user');
var googleConfig = require('./config/googleConfig')

var app = express();

passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

passport.use(new GoogleStrategy(googleConfig,
  function(accessToken, refreshToken, profile, done) {
    console.log('UserDB', UserDB.findOrCreate);
    UserDB.findOrCreate({ id: profile.id }, function (err, user) {
    //   return done(err, user);
    // process.nextTick(function (){

      // Changing this to return the accessToken instead of the profile information                                
        console.log(profile.displayName);                                                                        

      return done(null, [{token:accessToken,rToken:refreshToken,'profile':profile}]);
    });
  }
));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/auth/google', passport.authenticate('google', { scope: 'profile'
     }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/hhghg' }),
  function(req, res) {
    console.log("made it to callback");
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//creating session routes
app.get('/api/user', function(req,res){
  if(req.user){
    //logged in
    res.status(200).send({username: req.user.username});
  } else {
    //not logged in
    //401 not authenticated
    res.status(401).send({error : "not authenticated"});
  }
});


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
