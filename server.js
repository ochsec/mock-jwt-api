var express = require('express');
var routes = express.Router();
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config');
app.set('secret', config.secret);
var port = process.env.PORT || 8080;
var User = require('./app/models/user');
var users = require('./app/data/users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

routes.get('/', function(req, res) {
    res.send('The API at http://localhost:' + port + '/api is running');
});

routes.post('/token', function(req, res) {
    user = users.find(u => u.Username == req.body.username);
    console.dir(req.body);
    if (!user) {
        res.json({ success: false, message: 'User not found.' });
    } else {
        if (user.Password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' })
        } else {
            const payload = {
                unique_name: user.Username,
                nameid: user.UserId,
                role: 'student' 
            };

            var token = jwt.sign(payload, app.get('secret'), {
                expiresIn: '1h'
            });

            res.json({
                success: true,
                message: 'Enjoy your token!',
                access_token: token
            });
        }
    }
});

/* Authenticated routes beyond this point */

routes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            req.decoded = decoded;
            next();
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
})

routes.get('/users', function(req, res) {
    res.json(users);
});

app.use('/api', routes);

app.listen(port);
console.log('Listening at http://localhost:' + port);
