class Eventhandler {
    constructor(datamanager, renderer) {
        this.datamanager = datamanager;
        this.renderer = renderer;
        this.storyId = null;
        this.socket = null;
    }

    socketConnect() {
        const socket = io.connect();
        this.socket = socket
    }

    socketLogin() {
        $('#login-btn').on('click', () => {
            let user = { name: $('#username').val() }
            this.datamanager.login(user).then((data) => {
                if (data.isNew) {
                    this.socket.emit('register', data.user, this.socket.id);
                } else {
                    this.socket.emit('login', data.user, this.socket.id);
                }
            })
        })
    }

    async newStory() {
        $('#new-story').on('click', () => {
            this.storyId = await this.datamanager.newStory();
            
        })
    }

    sentenceHandle() {
        $('#send-sentence').on('click', () => {

        })
    }

    printSocket() {
        console.log(this.socket);
    }
}

export default Eventhandler