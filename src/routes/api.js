module.exports = (express, app, User, jwt) => {

    const apiRoutes = express.Router();

    apiRoutes.get('/', (req, res) => {
        res.json({ message: 'Welcome at API'});
    });

    apiRoutes.get('/users', (req, res) => {
        User.find({}, (err, users) => {
            res.json(users);
        });
    });

    apiRoutes.post('/authenticate', (req, res) => {
        User.findOne({
            name: req.body.name
        }, (err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found'});
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    const token = jwt.sign(user, app.get('superSecret'), {
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
    });

    app.use('/api', apiRoutes);
};
