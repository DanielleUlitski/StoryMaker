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
        $('#login-btn-modal').on('click', () => {
            let user = { name: $('#username').val() }
            this.datamanager.login(user).then((data) => {
                // if (data) {
                    // this.socket.emit('register', data, this.socket.id);
                // } else {
                    this.socket.emit('login', data, this.socket.id);
                    this.renderer.renderNewUser(data.name);
                // }
            })
        })
    }

    newStory() {
        $('#new-story').on('click', async () => {
            let newRoomInfo = await this.datamanager.newStory();
            debugger;
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