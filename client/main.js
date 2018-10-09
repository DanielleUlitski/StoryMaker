const socket = io.connect();
socket.on('news', function(str) {
    console.log(str);
})