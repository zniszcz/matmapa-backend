const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');

const port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

const apiRoutes = require('./routes/api');

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/setup', (req, res) => {
    const nick = new User({
        name: 'Nick',
        password: 'password',
        admin: true
    });

    nick.save(err => {
        if (err) throw err;

        res.json({success: true});
    });
});

apiRoutes(express, app, User, jwt);

app.listen(port);
