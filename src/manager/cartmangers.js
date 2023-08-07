const fs = require("fs").promises;
const path = require("path");

const cartsFilePath = path.join(__dirname, "..", "carts.json");

class CartManager {
    constructor() {
        // No es necesario recibir el path en el constructor
    }

    async getCarts() {
        try {
            if (await fs.exists(cartsFilePath)) {
                const cartlist = await fs.readFile(cartsFilePath, "utf-8");
                const cartlistparse = JSON.parse(cartlist);
                return cartlistparse;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(cartId) {
        const allCarts = await this.getCarts();
        const found = allCarts.find(cart => cart.id === parseInt(cartId));
        if (found) {
            return found;
        } else {
            throw new Error("Cart no encontrado");
        }
    }

    async generateCartId() {
        const listadecarts = await this.getCarts();
        const counter = listadecarts.length;
        return counter === 0 ? 1 : listadecarts[counter - 1].id + 1;
    }

    async addCart() {
        const listadecarts = await this.getCarts();
        const id = await this.generateCartId();
        const cartnew = {
            id,
            products: []
        };
        listadecarts.push(cartnew);
        await fs.writeFile(cartsFilePath, JSON.stringify(listadecarts, null, 2));
    }

    async addProductToCart(cartId, productId) {
        const listaCarts = await this.getCarts();

        const cart = listaCarts.find(e => e.id === cartId);

        if (cart) {
            const productoIndex = cart.products.findIndex(element => element.pid === productId);

            if (productoIndex !== -1) {
                cart.products[productoIndex].quantity++;
            } else {
                cart.products.push({
                    pid: productId,
                    quantity: 1
                });
            }

            await fs.writeFile(cartsFilePath, JSON.stringify(listaCarts, null, 2));
        } else {
            throw new Error("Cart no encontrado");
        }
    }
}

module.exports = CartManager;

