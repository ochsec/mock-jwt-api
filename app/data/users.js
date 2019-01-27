var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var demo = new User({
    username: 'demo',
    password: 'abc123',
    customerId: 10000
});

var users = [
    demo
];

module.exports = users;
