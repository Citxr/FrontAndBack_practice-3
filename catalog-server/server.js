const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

const instanceId = Math.floor(Math.random() * 1000);

const server = http.createServer((req, res) => {
    console.log(`[Instance ${instanceId}] Request: ${req.method} ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/products' && req.method === 'GET') {
        fs.readFile(PRODUCTS_FILE, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const products = JSON.parse(data);
                const response = {
                    products: products,
                    serverInfo: {
                        instanceId: instanceId,
                        port: PORT
                    }
                };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Catalog server instance ${instanceId} is running on http://localhost:${PORT}`);
});
