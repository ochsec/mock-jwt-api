var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var demo = new User({
    Username: 'demo',
    Password: 'abc123',
    CustomerId: 10000,
    UserId: 12345678,
    UserType: 'student'
});

var users = [
    demo
];

module.exports = users;
