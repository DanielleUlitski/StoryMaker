const mongoose = require('mongoose')
const express = require('express');
const router = express();

const StoryMaker = mongoose.connect('mongodb://localhost:27017/storymakerdb', (err) => {
    console.log('connection established')
});

const user = require('./modules/userModule');
const story = require('./modules/storyModule');

router.post('/login', (req, res) => {
    user.find({ "name": req.body.name }, (err, data) => {
        if (err) res.send(err);
        if (data) res.send(true);
        res.send(false);
    })
})

router.post('/register', (req, res) => {
    user.find({ "name": req.body.name }, (err, data) => {
        if (err) res.send(err);
        if (data) res.send('this user name is taken')
        let newUser = new user(req.body.name);
        newUser.save();
        res.send(newUser);
    })
})

router.post('/newStory', (req, res) => {
    let newStory = new story([], [req.body.user._id]);
    newStory.save();
    res.send(newStory._id);
})

router.get('/thisStory/:id', (req, res) => {
    story.find({'_id' : req.params.id}, (err, data)=>{
        if(err) res.send(err)
        res.send(data);
    })
})

module.exports = router