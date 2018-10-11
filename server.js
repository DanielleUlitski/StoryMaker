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
        // console.log(socket.room);
        let userIndex = findWithAttr(users, 'username', socket.username)
        story.findOne({ "_id": newRoom }, (err, data) => {
            if (err) throw new Error(err);
            data.users.push(users[userIndex].userId)
            data.save();
            // console.log(data);
            story.findOne({ '_id': newRoom }).populate('users').exec((err, story) => {
                if (err) throw new Error(err);
                console.log(story);
                io.sockets.in(newRoom).emit('roomJoined', story);
            })
        })
    })

    socket.on('finishStory', (thisStory) => {
        io.sockets.to(thisStory).emit('storyFinished')
        socket.leaveAll();
        socket.join('Lobby');
        socket.room = 'Lobby'
        rooms.splice(rooms.indexOf(thisStory), 1);
        socket.emit('returnToLobby');
    })

    socket.on('sendinvite', (username, roomId) => {
        let socketId = users[findWithAttr(users, 'username', username)].session;
        io.to(`${socketId}`).emit('invite', roomId, socket.username)
    })

    socket.on('sentence', (line, storyId) => {
        story.findOne({ "_id": storyId }, (err, data) => {
            data.sentences.push({ text: line.sentence, image: line.image });
            data.save()
        }).then(() => {
            story.findOne({ '_id': storyId }).populate('users').exec((err, res) => {
                console.log(res)
                io.sockets.in(storyId).emit('updateSentence', res);
            })
        })
    })

    socket.on('saveStory', (storyId) => {
        user.find({ 'name': socket.username }, (err, user) => {
            if (err) throw new Error(err);
            if (!user.stories.includes(storyId)) {
                user.stories.push(storyId);
                user.save();
            }
        })
    })

    socket.on('leaveRoom', (storyId, userId) => {
        story.find({ "_id": storyId }, (err, thisStory) => {
            if (err) throw new Error(err);
            thisStory.users.splice(thisStory.users.indexOf(userId), 1);
            thisStory.save();
        })
        socket.leaveAll();
        socket.join('Lobby');
        socket.room = 'Lobby';
        socket.emit('returnToLobby');
    })
});