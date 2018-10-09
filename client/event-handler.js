class Eventhandler {
    constructor(datamanager, renderer) {
        this.datamanager = datamanager;
        this.renderer = renderer;
        this.session = null
    }

    socketConnect() {
        const socket = io.connect();
        this.session = socket
    }

    socketLogin() {
        $('#login-btn').on('click', ()=>{
            let user = {name:$('#username').val()}
            $.post('/login', user, (data)=>{
                if (data) {
                    socket.emit('login', socket.id);
                }
                else {
                    $.post('/register', user).then((data)=>{
                        socket.emit('register', data, socket.id);
                    });
                }
            })
        })
    }


}

export default Eventhandler