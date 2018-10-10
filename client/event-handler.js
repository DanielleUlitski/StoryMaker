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
            let newRoomInfo = await this.datamanager.newStory();
            this.storyId = newRoomInfo.storyId;
            this.socket.emit('makeRoom', this.storyId);
            this.renderer.renderNewStory(this.storyId);
        })
    }

    sentenceHandle() {
        $('#send-sentence').on('click', () => {

        })
    }
}

export default Eventhandler