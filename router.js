const mongoose = require('mongoose')
const express = require('express');
const router = express();

mongoose.connect('mongodb://localhost:27017/storymakerdb', (err) => {
    if (err) console.log(err);
    console.log('connection established')
});

const user = require('./modules/userModule');
const story = require('./modules/storyModule');

router.post('/login', (req, res) => {
    user.find({ "name": req.body.name }, (err, data) => {
        if (err) throw new error(err);
        if (data.length != 0) {
            console.log(data)
            res.send(data[0])
        } else {
            res.send(false);
        }
    })
})

router.post('/register', (req, res) => {
    user.find({ "name": req.body.name }, (err, data) => {
        if (err) res.send(err);
        if (data.length > 0) { res.send('this user name is taken') }
        else {
            let newUser = new user({ name: req.body.name });
            newUser.save();
            console.log(newUser);
            res.send(newUser);
        }
    })
})

router.post('/newStory', (req, res) => {
    let newStory = new story({sentences: [], users: [req.body._id]});
    newStory.save();
    console.log(newStory);
    res.send(newStory._id);
})

router.get('/thisStory/:id', (req, res) => {
    story.find({ '_id': req.params.id }, (err, data) => {
        if (err) res.send(err)
        res.send(data);
    })
})

router.post('/newSentence', (req, res) => {

})

module.exports = router