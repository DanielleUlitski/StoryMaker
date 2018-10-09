const mongoose = require('mongoose');
const sentence = require('./sentenceModule');
const user = require('./userModule');

const StorySchema = new mongoose.Schema({
    sentences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sentence'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const story = mongoose.model('Story', StorySchema, 'Stories');

module.exports = story;