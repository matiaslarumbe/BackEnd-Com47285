import express from "express";
import ProductManager from "../../desafio-2/ProductManager";

const productManager = new ProductManager();

const PORT = 4000

 const app = express()

 const path = "./product.json";

 app.get('/', (req, res) => {
    res.send("hola")

 })



 app.listen(PORT, () => {
    console.log(`Server on port ${PORT} `)

 })
 app.get("/products/:id", async (req, res) => {
   const { id } = req.params;
 
   const prodById = await productManager.getProductById(parseInt(id));
 
   if (!prodById) {
      const products = prods.filter(prod => prod.title === title)
       
      res.status(200).send(products)
  }
  res.status(200).send(prods) 
     res.send("Producto no encontrado");
   }
 );



