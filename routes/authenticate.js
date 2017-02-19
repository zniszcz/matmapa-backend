const User = require('../models/user');
const jwt = require('jsonwebtoken');
const routes = require('express').Router();
const config = require('../utils/config');

module.exports = (req, res) => {
  if (!req.body.name || !req.body.password) {
    return res.json({
      success: false,
      message: `Authentication failed. You don't passed nick or password.`
    });
  }

  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found'});
    } else {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      } else {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 60*60*24
        });

        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  });
};
