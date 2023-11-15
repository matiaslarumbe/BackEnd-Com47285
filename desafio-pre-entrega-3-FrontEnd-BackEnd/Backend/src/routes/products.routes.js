import { Router } from "express";
import {getProductById, getProducts, postProduct, putProductById, deleteProductById } from "../controllers/products.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById)
productRouter.post('/', passportError('jwt'), authorization('Admin'), postProduct)
productRouter.put('/:id',passportError('jwt'), authorization('Admin'), putProductById)
productRouter.delete('/:id',passportError('jwt'), authorization('Admin'), deleteProductById)

export default productRouter