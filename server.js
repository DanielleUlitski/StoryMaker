const express = require('express');
const path = require('path');
const router = require('./router');
const mongoose = require('mongoose');
const app = express();

const StoryMaker = mongoose.connect('mongodb://localhost:27017/storymakerdb',(err)=>{
    if (err) console.log(err);
    else console.log('connection established!!!')
});

const user = require('./modules/userModule');
const sentence = require('./modules/sentenceModule');
const story = require('./modules/storyModule');

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.listen(8000);