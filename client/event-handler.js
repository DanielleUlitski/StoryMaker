class Eventhandler {
    constructor(datamanager, renderer) {
        this.datamanager = datamanager;
        this.renderer = renderer;
    }

    socketConnect() {
        const socket = io.connect();
        socket.on('news', function (str) {
            console.log(str);
        })
        socket.on('connect', function(data){
            console.log("called connect");
            console.log(user_id);
            socket.emit('init', user_id);
        });
    }

    socketLogin() {
        $('#login-btn').on('click', ()=>{
            $.post('/login', {name:$('#username').val()}, (data)=>{
                if (data) {
                    socket.emit('login', )
                }
            })
        })
    }
    
}

export default Eventhandler