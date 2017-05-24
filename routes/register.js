const addUserService = require('../utils/addUserService');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../utils/config');

const makeHash = (password) => {
  const firstHash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  return crypto
    .createHash('sha256')
    .update(firstHash)
    .digest('hex');
};

module.exports = (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    return res.json({
      success: false,
      message: `Registration failed. You don't passed email, nick or password.`
    });
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: makeHash(req.body.password),
  };

  addUserService
    .addUser(user)
    .then((user) => {
      const token = jwt.sign(user, config.secret, {
        expiresIn: 60*60*24
      });

      res.json({
        success: true,
        message: `Added User successfully.`,
        data: {
          user: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
          token,
        }
      });
    }, (error) => {
      res.json({
        success: false,
        message: error,
      });
    });
};
