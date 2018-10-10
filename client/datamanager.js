class DataManager {
    constructor() {
        this.userConnected = false;
        this.user = null
    }

   async login(user) {
       let data = await $.post('/login', user)
            if (data) {
                this.userConnected = true;
                this.user = data
                return this.user
            }
            else {
               let newUser =await $.post('/register', user)
                    console.log(newUser);
                    this.userConnected = true;
                    this.user = newUser
                    let isNew = true;
                    return newUser
            }
    }

    async newStory() {
        debugger;
        let storyId = await $.post('/newStory', this.user)
        return {storyId: storyId, user: this.user}
    }
}

export default DataManager;