class Renderer {
    constructor() {
        this.$usersTemplate = $('#users-template').html();
        this.$sentenceTemplate = $('#sentence-template').html();
        this.$storiesTemplate = $('#stories-template').html();
        this.$newStoryTemplate = $('#new-story-template').html();
    }

    renderUsers(users) {
        const template = Handlebars.compile(this.$usersTemplate);
        const newHTML = template({users});
        $('#users-list').empty().append(newHTML);
    }

    renderNewStory(id) {
        const template = Handlebars.compile(this.$newStoryTemplate);
        const newHTML = template({id});
        console.log(newHTML);
        $('#main-screen').empty().append(newHTML);
    }

    renderStory(sentences) {
        const template = Handlebars.compile(this.$sentenceTemplate);
        const newHTML = template({sentences});
        $('#story-screen').empty().append(newHTML);
    }

    renderAllStories(stories) {
        const template = Handlebars.compile(this.$storiesTemplate);
        const newHTML = template({stories});
        $('#main-screen').empty().append(newHTML); // ????
    }

    renderNewUser(username) {
        $('#login-modal').modal('hide');
        $('.header').empty().append(`<span class='header-item'> Hi ${username}</span>`);
    }
}

export default Renderer;