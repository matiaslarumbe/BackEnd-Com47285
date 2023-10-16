import express from "express";
import ProductManager from "../src/ProductManager.js";

const productManager = new ProductManager();

const PORT = 4000

 const app = express()

 const path = "";

 app.get('/', (req, res) => {
    res.send("hola")

 })
 app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    console.log(req.query);
    const { limit } = req.query;
    if (limit) {
      const productsFiltered = products.slice(0, limit);
      return res.send(productsFiltered);
    }
  
    res.send(products);
  });
  



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
 )
 