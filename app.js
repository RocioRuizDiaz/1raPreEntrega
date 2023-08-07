const express = require('express');
const path = require('path');
const productsRouter = require('./src/routes/products.router.js');
const cartRouter = require('./src/routes/carts.router.js');

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', productsRouter);
app.use('/', cartRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});