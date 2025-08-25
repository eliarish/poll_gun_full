const express = require('express');
const http = require('http');
const Gun = require('gun');
require('gun/axe');

const PORT = process.env.PORT || 8765;

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);

// persistency в файле "data"
const gun = Gun({ web: server, file: 'data' });

server.listen(PORT, () => {
  console.log(`Gun server running on http://localhost:${PORT}`);
});
