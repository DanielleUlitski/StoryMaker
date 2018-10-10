const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = app.listen(8000);
const io = require('socket.io').listen(server);
const router = require('./router');

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

const user = require('./modules/userModule');
const story = require('./modules/storyModule');
const users = [];
const rooms = ['Lobby'];
const usernames = {}

function findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

user.find((err, data) => {
    if (err) return err;
    for (let user of data) {
        users.push({ username: user.name, session: null, userId: user._id });
    }
})

io.sockets.on('connection', function (socket) {
    console.log('a user connected');
    console.log(socket.id)
    socket.emit('id', socket.id)

    socket.on('disconnect', () => {
        delete usernames[socket.username]
        socket.leaveAll();
        console.log('disconnected');
    })

    socket.on('login', (user, sessionId) => {
        if (findWithAttr(users, 'username', user.name) != -1) {
            users[findWithAttr(users, 'username', user.name)].session = sessionId;
        } else {
            users.push({ username: user.name, session: sessionId, userId: user._id });
        }
        socket.username = user.name;
        usernames[user.name] = user.name;
        socket.room = 'Lobby'
        socket.join('Lobby')
        console.log(socket.room);
    })

    socket.on('makeRoom', (newRoom) => {
        socket.leaveAll();
        rooms.push(newRoom)
        socket.join(newRoom)
        socket.room = newRoom
        console.log(socket.room);
    })

    socket.on('joinRoom', (newRoom) => {
        socket.leaveAll();
        socket.join(newRoom)
        socket.room = newRoom
        console.log(socket.room);
        let userIndex = findWithAttr(users, 'username', socket.username)
        story.findOne({ "_id": newRoom }, (err, data) => {
            if (err) throw new Error(err);
            data.users.push(users[userIndex].userId)
            data.save();
        }).populate('users').exec((err, story) => {
            if (err) throw new Error(err);
            socket.emit('roomJoined', story);
        })
    })

    socket.on('finishStory', (thisStory) => {
        socket.leaveAll();
        socket.join('Lobby');
        socket.room = 'Lobby'
        rooms.splice(rooms.indexOf(thisStory), 1);
    })

    socket.on('sendinvite', (username, roomId) => {
        let socketId = users[findWithAttr(users, 'username', username)].session;
        io.to(`${socketId}`).emit('invite', roomId, socket.username)
    })

    socket.on('sentence', (sentence, storyId) => {
        story.findOne({ "_id": storyId }, (err, data)=>{
            data.sentences.push({text: sentence, image: ""});
            data.save()
            io.sockets.in(storyId).emit('updateSentence', data);
        })
    })
});