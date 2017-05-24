const User = require('../models/user');
const jwt = require('jsonwebtoken');
const routes = require('express').Router();
const config = require('../utils/config');
const crypto = require('crypto');

class AddUserService {
  addUser({ name, password, email}) {
    const executeAddingUser = (resolve, reject) => {
      User.find({ name }, (err, users) => {
        if (err) throw err;
        if (users.length) {
          reject(`User with given nick already exist.`);
        } else {
          User.find({ email }, (err, users) => {
            if (err) throw err;
            if (users.length) {
              reject(`User with given email already exist.`);
            } else {
              const newUser = new User({
                name,
                email,
                password,
              });

              newUser.save((err) => {
                if (err) throw err;
                resolve(newUser);
              });
            }
          });}
      });
    };
    return new Promise(executeAddingUser);
  }
}

module.exports = new AddUserService();
