const https = require('https');
const url = require('url');
const MessageHandler = require('./modules/msgHandle');

class Server {
    constructor() {
        this.messageHandler = new MessageHandler();
        this.server = https.createServer((req, res) => this.handleRequest(req, res));
    }

    // Handle incoming requests
    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/lab3/getDate/' && req.method === 'GET') {
            const name = parsedUrl.query.name || 'Guest';
            const message = this.messageHandler.formatMessage(name);
            const styledMessage = `<p style="color: blue;">${message}</p>`;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(styledMessage);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }

}
