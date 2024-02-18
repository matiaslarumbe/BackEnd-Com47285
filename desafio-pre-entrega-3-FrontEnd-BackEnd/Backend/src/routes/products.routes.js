import { Router } from "express";
import {getProductById, getProducts, postProduct, putProductById, deleteProductById, getAllProducts, createProduct } from "../controllers/products.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById)
productRouter.post('/', passportError('jwt'), authorization('admin'), postProduct)
productRouter.put('/:id', passportError('jwt'), authorization('admin'), putProductById)
productRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProductById)

productRouter.get('/all', getAllProducts); // Ruta para obtener todos los productos
productRouter.post('/create', passportError('jwt'), authorization('admin'), createProduct); // Ruta para crear un nuevo producto

export default productRouter
