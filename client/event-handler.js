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
            $.post('/login', {name:$('#username').val()}, (data)=>{
                if (data) {
                    socket.emit('login', )
                }
            })
        })
    }
}

export default Eventhandler