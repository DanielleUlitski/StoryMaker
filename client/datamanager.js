class DataManager {
    constructor() {
        this.userConnected = false;
    }

    login(user) {
        $.post('/login', user, (data)=>{
            if (data) {
                this.userConnected = true;
                return data
            }
            else {
                $.post('/register', user).then((data)=>{
                    this.userConnected = true;
                    return data;
                });
            }
        })
    }
}