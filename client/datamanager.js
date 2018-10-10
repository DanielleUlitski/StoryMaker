class DataManager {
    constructor() {
        this.userConnected = false;
        this.user = null
    }

   async login(user) {
       let data = await $.post('/login', user)//.then((data) => {
            // console.log(data);
            if (data) {
                this.userConnected = true;
                this.user = data
                return this.user
            }
            else {
                // console.log(user)
               let newUser =await $.post('/register', user)//.then((newUser) => {
                    console.log(newUser);
                    this.userConnected = true;
                    this.user = newUser
                    let isNew = true;
                    return newUser
                // });
            }
        // }/)
    }

    async newStory() {
        debugger;
        let storyId = await $.post('/newStory', this.user)//.then((storyId) => {
        // })
        return {storyId: storyId, user: this.user}
    }

    saveSentence(sentence, thisStory) {
        $.post('/newSentence', {}, () => {

        })
    }
}

export default DataManager;