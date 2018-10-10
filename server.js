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

function findWithAttr(array, attr, value) {
    for(let i = 0; i < array.length; i ++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

user.find((err, data)=>{
    if(err) return err;
    for(let user of data) {
        users.push({username: user.name, session: null});
    }
})

io.on('connection', function (socket) {
    console.log('a user connected');
    console.log(socket.id)
    io.emit('id', socket.id)
});

io.on('disconnect', (socket)=>{
    console.log('disconnected');
})

io.on('login', (user ,sessionId)=>{
    users[findWithAttr(users, name, user.name)].session = sessionId;
})

io.on('register', (user, sessionId)=>{
    users.push({username: user.name, session: sessionId});
})