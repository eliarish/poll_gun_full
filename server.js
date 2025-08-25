const express = require('express');
const http = require('http');
const Gun = require('gun');
require('gun/axe');

const PORT = process.env.PORT || 8765;
const app = express();

app.use(express.json()); // для POST-запросов с JSON
app.use(express.static('public'));

const server = http.createServer(app);
const gun = Gun({ web: server, file: 'data' });

// Маршрут для создания нового опроса
app.post('/create-poll', (req, res) => {
  const { pollId, options } = req.body;
  if (!pollId || !options || !Array.isArray(options)) {
    return res.status(400).send('Неверные данные');
  }

  const pollRef = gun.get('polls').get(pollId);
  options.forEach(option => {
    pollRef.get(option).put({ option, count: 0 });
  });

  res.send(`Опрос ${pollId} создан с вариантами: ${options.join(', ')}`);
});

server.listen(PORT, () => {
  console.log(`Gun server running on http://localhost:${PORT}`);
});

