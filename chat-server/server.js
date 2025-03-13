const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
    console.log('Новое подключение');

    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);

        let data;
        try {
            data = JSON.parse(message);
        } catch (error) {
            console.error('Ошибка при парсинге сообщения:', error);
            return;
        }

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        console.log('Подключение закрыто');
    });
});

console.log('WebSocket сервер запущен на ws://localhost:8081');