import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import productsRouter from "../routes/products.router.js"; // Asegúrate de que la ruta sea correcta y relativa
import cartsRouter from "../routes/carts.Router.js"; // Asegúrate de que la ruta sea correcta y relativa

const app = express();

const PORT = 8080;

// Obtiene la ruta del directorio actual del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
});
