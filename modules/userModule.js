const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
})

const user = mongoose.model('User', UserSchema, 'Users');

module.exports = user;