const addUserService = require('../utils/addUserService');

module.exports = (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    return res.json({
      success: false,
      message: `Registration failed. You don't passed email, nick or password.`
    });
  }

  addUserService
    .addUser(req.body)
    .then((user) => {
      res.json({
        success: true,
        message: `Added User successfully.`,
        data: {
          user
        }
      });
    }, (error) => {
      res.json({
        success: false,
        message: error,
      });
    });
};
