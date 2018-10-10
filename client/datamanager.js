class DataManager {
    constructor() {
        this.userConnected = false;
        this.user = null
    }

    login(user) {
        $.post('/login', user, (data) => {
            if (data) {
                this.userConnected = true;
                this.user = data
                return { user: data, isNew: false };
            }
            else {
                $.post('/register', user).then((data) => {
                    this.userConnected = true;
                    this.user = data
                    return { user: data, isNew: true };
                });
            }
        })
    }

    newStory() {
        $.post('/newStory', this.user, (storyId) => {
            return {storyId: storyId, user: this.user}
        })
    }

    saveSentence(sentence, thisStory) {
        $.post('/newSentence', {}, () => {

        })
    }
}