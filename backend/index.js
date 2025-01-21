// const http = require('http');
const productsFile = require('./products');

const products = JSON.stringify(productsFile.products);

// const server = http.createServer((req, res) => {

//     if(req.url === '/products')
//     {
//         res.end(products);
//         console.log('new request');
//     }
// });

// server.listen(8000, () => {
//     console.log('server started');
// });

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/products', (req, res) => {
    res.send(products);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});



