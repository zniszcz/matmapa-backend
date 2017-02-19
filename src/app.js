const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./config');
const User = require('./models/user');

const port = process.env.PORT || 3000;

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

const routes = require('./routes/index');

app.use('/', routes);

app.listen(port);
