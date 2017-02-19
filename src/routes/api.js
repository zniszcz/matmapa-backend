module.exports = (express, app, User, jwt) => {

    const apiRoutes = express.Router();

    apiRoutes.use((req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('superSecret'), (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    apiRoutes.get('/', (req, res) => {
        res.json({ message: 'Welcome at API'});
    });

    apiRoutes.get('/users', (req, res) => {
        User.find({}, (err, users) => {
            res.json(users);
        });
    });


    app.use('/api', apiRoutes);
};
