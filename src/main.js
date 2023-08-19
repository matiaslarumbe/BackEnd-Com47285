import Product from "../desafio_2/product.js";
import ProductManager from "../desafio_2/productManager.js";

const managerTest = new ProductManager();
const product = new Product('Producto1','Test',10,'Test',12);
const product2 = new Product('Producto2','Test',10,'Test',12);
// managerTest.addProduct(prod2);
managerTest.addProduct(product2);

// console.log(managerTest.getProducts());
// managerTest.getProducts();
// console.log(managerTest.getProductById(1));
// managerTest.deleteProduct(2);

// console.log("Hola");