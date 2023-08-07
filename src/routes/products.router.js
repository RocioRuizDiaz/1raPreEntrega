const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../manager/ProductsManager');
const productsFilePath = path.join(__dirname, '..', 'products.json');

router.get("/products", async (req, res) => {
    try {
        const listOfProducts = await manager.getProducts(req.query);
        res.json({ message: "success", listOfProducts });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the products." });
    }
});
router.get("/products/:pid",async(req,res)=>{
    const productfound=await manager.getProductbyId(req.params)
    res.send({status:"success",productfound})
})

router.post("/products",async(req,res)=>{
    const newproduct=await manager.addProduct(req.body)
    res.send({status:"success",newproduct})
})

router.put("/products/:pid",async(req,res)=>{
console.log(req.params)
    const updatedproduct=await manager.updateProduct(req.params,req.body)
    res.send({status:"success",updatedproduct})
})
router.delete("/products/:pid",async(req,res)=>{
    const deletedproduct=await manager.deleteProduct(req.params)
    res.send({status:"success",deletedproduct})
})







module.exports = router;
