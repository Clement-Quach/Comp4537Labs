const http = require('http');
const url = require('url');
const MessageHandler = require('./modules/msgHandle');
const msgs = require('./modules/en');
const fs = require('fs');
const path = require('path');

class FileHandler {
  constructor(filePath) {
      this.filePath = filePath;
  }

  appendText(text, callback) {
      fs.appendFile(this.filePath, text + '\n', (err) => {
          if (err) return callback(err);
          callback(null, 'Text appended to file');
      });
  }

  readFile(callback) {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
          if (err) return callback(err);
          callback(null, data);
      });
  }
}

class Server {
    constructor(fileHandler) {
        this.messageHandler = new MessageHandler();
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
        this.fileHandler = fileHandler
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
        } else if (pathname === '/comp4537labs-lab-3/lab3/writeFile/' && req.method === 'GET') {
          this.handleWriteFile(parsedUrl.query.text, res);
      } else if (pathname === '/comp4537labs-lab-3/lab3/readFile/file.txt' && req.method === 'GET') {
          this.handleReadFile(res);
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

    handleWriteFile(text, res) {
      if (!text) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Bad Request: No text provided');
          return;
      }

      this.fileHandler.appendText(text, (err, message) => {
          if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
              return;
          }
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(message);
      });
  }

  handleReadFile(res) {
      this.fileHandler.readFile((err, data) => {
          if (err) {
              if (err.code === 'ENOENT') {
                  res.writeHead(404, { 'Content-Type': 'text/plain' });
                  res.end('404 Not Found: file.txt does not exist');
              } else {
                  res.writeHead(500, { 'Content-Type': 'text/plain' });
                  res.end('Internal Server Error');
              }
              return;
          }
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
      });
  }
}

// Start the server
const port =  3000;
const FILE_PATH = path.join(__dirname, 'file.txt');
const fileHandler = new FileHandler(FILE_PATH);
const server = new Server(fileHandler);
server.start(port);