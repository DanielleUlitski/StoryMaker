const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
// const mongoose = require('mongoose');
const app = express();
const server = app.listen(8000);
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

const sentence = require('./modules/sentenceModule');
const user = require('./modules/userModule');
const story = require('./modules/storyModule');

io.on('connection', function (socket) {
    console.log('a user connected');
    io.emit('news', 'its a wonderfull day!')
});