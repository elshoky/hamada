// Import the HTTP module
const http = require('http');

// Define the port number
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Set the HTTP status code
  res.setHeader('Content-Type', 'text/plain'); // Set the content type
  res.end('Hello, Node.js!\n'); // Send a response
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

