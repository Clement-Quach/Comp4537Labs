const http = require('http');
const url = require('url');
const MessageHandler = require('./modules/msgHandle');
const msgs = require('./modules/en');

class Server {
    constructor() {
        this.messageHandler = new MessageHandler();
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
    }

    // Handle incoming requests
    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/comp4537labs-lab-3/lab3/getDate/' && req.method === 'GET') {
            const name = parsedUrl.query.name || 'Guest';
            const message = this.messageHandler.formatMessage(name);
            const styledMessage = `<p style="color: blue;">${message}</p>`;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(styledMessage);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(msgs.err);
        }
    }

    // Start the server
    start(port) {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

// Start the server
const port = process.env.PORT || 3000;
const server = new Server();
server.start(port);