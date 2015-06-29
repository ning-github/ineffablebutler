var express = require('express');
var app = express();
var logoutRouter = express.Router();

logoutRouter.get('/', function (req, res) {
  console.log("logout req user ", req.user);
  req.logout();
  req.session.destroy();
  res.status(200).send({
    status: "logged-out"
  });
});

module.exports = logoutRouter;
