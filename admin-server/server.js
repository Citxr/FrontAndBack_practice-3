const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PRODUCTS_FILE = path.join(__dirname, '../catalog-server/products.json');

const server = http.createServer((req, res) => {
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
    } else if (req.url === '/add' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const newProduct = JSON.parse(body);
            fs.readFile(PRODUCTS_FILE, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    const products = JSON.parse(data);
                    // Генерация уникального ID на сервере
                    newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                    products.push(newProduct);
                    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Товар добавлен', id: newProduct.id }));
                        }
                    });
                }
            });
        });
    } else if (req.url === '/edit' && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const updatedProduct = JSON.parse(body);
            fs.readFile(PRODUCTS_FILE, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    const products = JSON.parse(data);
                    const index = products.findIndex(p => p.id === updatedProduct.id);
                    if (index !== -1) {
                        products[index] = updatedProduct;
                        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' });
                                res.end('Internal Server Error');
                            } else {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Товар обновлен' }));
                            }
                        });
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Товар не найден');
                    }
                }
            });
        });
    } else if (req.url.startsWith('/delete') && req.method === 'DELETE') {
    const productId = parseInt(req.url.split('=')[1]);
    fs.readFile(PRODUCTS_FILE, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            const products = JSON.parse(data);
            const index = products.findIndex(p => p.id === productId);
            if (index !== -1) {
                products.splice(index, 1);
                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Товар удален' }));
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Товар не найден' }));
            }
        }
    });
} else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Admin server is running on http://localhost:${PORT}`);
});