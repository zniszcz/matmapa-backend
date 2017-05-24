const routes = require('express').Router();
const protect = require('../utils/protectRoute');

const authenticate = require('./authenticate');
const register = require('./register');
const showNode = require('./node/index');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.post('/authenticate', authenticate);

routes.post('/register', register);

routes.get('/node', protect, showNode);

module.exports = routes;
