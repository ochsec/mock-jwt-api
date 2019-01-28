var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    Username: String,
    Password: String,
    UserId: Number,
    UserType: String,
    CustomerId: Number,
}));
