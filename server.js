const http = require('http');
const app = require('./app');

// Constants
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Listening to server port
server.listen(port, () => console.log('Server running on port: ' + port));