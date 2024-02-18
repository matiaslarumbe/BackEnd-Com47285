import { Router } from "express";
import { createCart, getCartById, addProductToCart, removeProductFromCart, updateCart,updateProductInCart, removeAllProductsFromCart, getAllCarts } from "../controllers/cart.controllers.js";

const cartRouter = Router()

// Ruta para crear un carrito
cartRouter.post("/", createCart);

// Ruta para obtener un carrito por ID
cartRouter.get('/:id', getCartById);

// Ruta para agregar productos al carrito
cartRouter.post('/:cid/products/:pid', addProductToCart);

// Ruta para eliminar un producto del carrito
cartRouter.delete('/:cid/products/:pid', removeProductFromCart);

// Ruta para actualizar el carrito con un arreglo de productos
cartRouter.put('/:cid', updateCart);

// Ruta para actualizar la cantidad de ejemplares de un producto en el carrito
cartRouter.put('/:cid/products/:pid', updateProductInCart);

// Ruta para eliminar todos los productos del carrito
cartRouter.delete('/:cid', removeAllProductsFromCart);

// Ruta para obtener todos los carritos
cartRouter.get('/', getAllCarts);


export default cartRouter
