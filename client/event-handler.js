class Eventhandler {
    constructor(datamanager, renderer) {
        this.datamanager = datamanager;
        this.renderer = renderer;
        this.roomInvite = null;
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
                this.socket.emit('login', data, this.socket.id);
                this.renderer.renderNewUser(data.name);
            })
        })
    }

    newStory() {
        $('#new-story').on('click', async () => {
            let newRoomInfo = await this.datamanager.newStory();
            this.storyId = newRoomInfo.storyId;
            this.socket.emit('makeRoom', this.storyId);
            this.renderer.renderNewStory(this.storyId, newRoomInfo.user);
        })
    }

    sendInvite() {
        $("#send-invite-btn").on('click', () => {
            let username = $("#invite-username").val();
            this.socket.emit('sendinvite', username, this.storyId)
        })
    }

    recieveInvite() {
        this.socket.on('invite', (room, user) => {
            this.roomInvite = room;
            this.renderer.renderInvite(user);
        })
    }

    declineInvite() {
        $('#decline-invite').on('click', () => {
            this.roomInvite = null;
        })
    }

    acceptInvite() {
        this.socket.on('roomJoined', (story) => {
            this.renderer.renderNewStory(story._id);
            this.renderer.renderStory(story);
        })
        $('#accept-invite').on('click', () => {
            this.socket.emit('joinRoom', this.roomInvite);
            this.storyId = this.roomInvite
            this.roomInvite = null;
        })
    }

    sentenceHandle() {
        this.socket.on('updateSentence', (data) => {
            debugger;
            this.renderer.renderStory(data);
        })
        $('#main-screen').on('click', "#send-sentence", async () => {
            let sentence = $('#sentence-input').val();
            $('#sentence-input').val('');
            let storyId = $('#story-container').data('id');
            // let image = await $.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyC70YzagFxuujLqGjyE16e2NjG-sy5ivl8&cx=014991769965957097369:ffltd_cexyk&q=${sentence}&searchType=Image`)
            this.socket.emit('sentence', sentence, storyId);      
        })
    }
}

export default Eventhandler