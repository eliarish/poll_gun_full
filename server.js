const express = require('express');
const http = require('http');
const Gun = require('gun');

const PORT = process.env.PORT || 8765;
const app = express();

// Статика (твой index.html и все файлы)
app.use(express.static('public'));

// Создаем HTTP сервер
const server = http.createServer(app);

// Инициализация Gun
const gun = Gun({
  web: server,
  file: 'data',     // хранение данных на диске Render
  radisk: true,     // локальное хранение
  ws: true          // WebSocket
});

// Опционально: простой маршрут для проверки сервера
app.get('/status', (req, res) => res.send('Gun server is running'));

// Запуск
server.listen(PORT, () => {
  console.log(`Gun server running on http://localhost:${PORT}`);
});
