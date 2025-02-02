const messages = require('./en');
const Utils = require('./utils');

class MessageHandler {
    constructor() {
        this.messageTemplate = messages.greeting;
    }

    // Format the message with the user's name and current date
    formatMessage(name) {
        const date = Utils.getDate();
        return this.messageTemplate.replace('%1', name).replace('%2', date);
    }
}

module.exports = MessageHandler;