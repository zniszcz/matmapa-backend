const routes = require('express').Router();
const protect = require('../utils/protectRoute');

const authenticate = require('./authenticate');
const showNode = require('./node/index');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.post('/authenticate', authenticate);

routes.get('/node', protect, showNode);

module.exports = routes;
