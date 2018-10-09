const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const app = express();
const server = app.listen(8000);
const io = require('socket.io').listen(server);
const router = require('./router');

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

const sentence = require('./modules/sentenceModule');
const user = require('./modules/userModule');
const story = require('./modules/storyModule');
const users = [];

user.find((err, data)=>{
    if(err) return err;
    for(let user of data) {
        users.push({username: user.name, session: null});
    }
})

io.on('connection', function (socket) {
    console.log('a user connected');
    console.log(socket.id)
    // io.emit('news', 'its a wonderfull day!')
    io.emit('connect', )
});

io.on('disconnect', (socket)=>{
    console.log('disconnected');
})

io.on('login', ()=>{})

