class Renderer {
    constructor() {
        this.$usersTemplate = $('#users-template').html();
        this.$sentenceTemplate = $('#sentence-template').html();
        this.$storiesTemplate = $('#stories-template').html();
    }

    renderUsers(users) {
        const template = Handlebars.compile(this.$usersTemplate);
        const newHTML = template({users});
        $('#users-list').empty().append(newHTML);
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
}

export default Renderer;