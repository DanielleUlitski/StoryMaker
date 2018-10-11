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

    renderNewStory(id, user) {
        const template = Handlebars.compile(this.$newStoryTemplate);
        const newHTML = template({id});
        console.log(newHTML);
        $('#main-screen').empty().append(newHTML);
        this.renderUsers([user])
    }

    renderStory(story) {
        console.log(story);
        const template = Handlebars.compile(this.$sentenceTemplate);
        let sentences = story.sentences;
        const newHTML = template({sentences});
        $('#story-screen').empty().append(newHTML);
        $('#sentence-input').val('');
        this.renderUsers(story.users);
    }

    renderAllStories(stories) {
        const template = Handlebars.compile(this.$storiesTemplate);
        const newHTML = template({stories});
        $('#main-screen').empty().append(newHTML);
    }

    renderNewUser(username) {
        $('#login-modal').modal('hide');
        $('.header').empty().append(`<span class='header-item'> Hi ${username}</span>`);
        $('#new-story').removeAttr('disabled');
        $('#show-stories').removeAttr('disabled');
    }

    renderInvite(username) {
        $('#invite-modal-title').html(`You were invited by ${username}!`);
        $('#receive-invite-modal').modal('toggle');
    }
}

export default Renderer;