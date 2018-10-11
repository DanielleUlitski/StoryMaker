const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
})

const user = mongoose.model('User', UserSchema, 'Users');

module.exports = user;