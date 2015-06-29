var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserDB = require('../models/user');
var googleConfig = require('../config/googleConfig');
var authRouter = express.Router();

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
  }, function (err, user, created) {
    if (err) {
      console.log("error:", err);
    }
    console.log("created:", created, user, accessToken, refreshToken);
    return done(null, profile);
  });
};
passport.use(new GoogleStrategy(googleConfig, function (accessToken, refreshToken, profile, done) {
  saveUser(accessToken, refreshToken, profile, done);
}));

authRouter.get('/google', passport.authenticate('google', {
  scope: 'profile'
}));
authRouter.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), function (req, res) {
  console.log("req user", req.user);
  // Successful authentication, redirect home.
  res.redirect('/');
});

module.exports = authRouter;