import Product from "./Products.js";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager();
const product = new Product('Producto1','Test',10,'Test',12);
const product2 = new Product('Producto2','Test',10,'Test',12);

manager.addProduct(product);
manager.addProduct(product2);

console.log(manager.getProducts());
console.log(manager.getProductByid(1));