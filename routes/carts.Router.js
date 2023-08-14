import {Router} from "express"
import cartManagers from "../managers/cartMangers.js"
import { __dirname } from "../utils.js"


const manager=new cartManagers(__dirname+'/files/carts.json')
const router =Router()


 // Obtiene todos los carritos.

router.get("/carts",async(req,res)=>{
   const carrito=await manager.getCarts()
   res.json({carrito})
})

//Obtiene carritos un  por su ID

router.get("/carts/:cid",async(req,res)=>{
    const carritofound=await manager.getCartbyId(req.params)
    res.json({status:"success",carritofound})
})

//Agrega un nuevo carrito

router.post("/carts/", async (req, res) => {
    const newcart = await manager.addCart();
     res.json({ status: "success", newcart });
  });

  //Agrega un producto a un carrito especifico


  router.post("/carts/:cid/products/:pid", async (req, res) => {
    try {
      const cid = parseInt(req.params.cid);
      const pid = parseInt(req.params.pid);
  
      await manager.addProductToCart(cid, pid);
      res.json({ status: "success", message: "Producto añadido a la cesta correctamente." });
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      res.status(500).json({ status: "error", message: "No se ha podido añadir el producto" });
    }
  });
  

export default router