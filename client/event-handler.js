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
        $('#login-btn').on('click', () => {
            let user = { name: $('#username').val() }
            this.datamanager.login(user).then((data) => {
                if (data instanceof Boolean) {
                    this.session.emit('login', this.session.id);
                } else {
                    this.session.emit('register', data, this.session.id);
                }
            })
        })
    }


}

export default Eventhandler