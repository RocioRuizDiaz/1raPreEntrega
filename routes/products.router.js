import {Router} from "express"
import { __dirname } from "../utils.js"

import ProductManager from "../managers/productManager.js"

const manager =new ProductManager(__dirname+"/files/products.json")
const router=Router()

//Obtiene una lista de productos
router.get("/products",async(req,res)=>{
    const listOfProducts= await manager.getProducts(req.query)
    res.json({message:"success",listOfProducts})
})

//Obtiene un producto por su ID
router.get("/products/:pid",async(req,res)=>{
    const productfound=await manager.getProductbyId(req.params)
    res.send({status:"success",productfound})
})

//Agrega un nuevo producto
router.post("/products",async(req,res)=>{
    const newproduct=await manager.addProduct(req.body)
    res.send({status:"success",newproduct})
})

//Actualiza un producto por su ID
router.put("/products/:pid",async(req,res)=>{
console.log(req.params)
    const updatedproduct=await manager.updateProduct(req.params,req.body)
    res.send({status:"success",updatedproduct})
})

//Elimina un producto por su ID
router.delete("/products/:pid",async(req,res)=>{
    const deletedproduct=await manager.deleteProduct(req.params)
    res.send({status:"success",deletedproduct})
})


export default router