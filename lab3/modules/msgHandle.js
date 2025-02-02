const fs = require('fs');
const path = require('path');
const Utils = require('./utils');

class MessageHandler {
    constructor() {
        this.messageTemplate = this.loadMessageTemplate();
    }

    // Load the message template from the JSON file
    loadMessageTemplate() {
        const filePath = path.join(__dirname, './en.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data).greeting;
    }

    // Format the message with the user's name and current date
    formatMessage(name) {
        const date = Utils.getDate();
        return this.messageTemplate.replace('%1', name).replace('%2', date);
    }
}

module.exports = MessageHandler;