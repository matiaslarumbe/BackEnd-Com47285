import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router()

productRouter.get('/', async (req,res) => {
    const { limit, page, category, sort } = req.query;

    try {
        const result = await ProductManager.findAll(limit, page, category, sort);

        const response = {
            status: "success",
            payload: result.docs, // Resultado de los productos solicitados
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.prevPage}&category=${category}&sort=${sort}` : null,
            nextLink: result.hasNextPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.nextPage}&category=${category}&sort=${sort}` : null
        };
        res.status(200).send({respuesta: 'OK', mensaje: prods})
    } catch(error) {
        res.status(400).send({respuesta: 'Error en consultar productos', mensaje: error})
    }
         
})

productRouter.get('/:id', async (req,res) => {
    const {id} = req.params

    try{
        const prod = await productModel.findById(id)
        if(prod)
            res.status(200).send({respuesta: 'OK', mensaje: prod})
        else
            res.status(404).send({respuesta: 'Error en consultar producto', mensaje: 'Not found'})
    } catch(error) {
        res.status(400).send({respuesta: 'Error en consultar productos', mensaje: error})
    }   
})

productRouter.post('/', async (req, res) => {
    const {title, description, stock, code, price, category } = req.body
    try{
        const prod = await productModel.create({title, description, stock, code, price, category })
        res.status(200).send({respuesta: 'OK', mensaje: prod})
    } catch(error) {
        res.status(400).send({respuesta: 'Error en crear productos', mensaje: error})
    }   
})

productRouter.put('/:id', async (req,res) => {
    const {id} = req.params
    const {title, description, stock, status, code, price, category } = req.body
 
    try{
        const prod = await productModel.findByIdAndUpdate(id, {title, description, stock, status, code, price, category})
        if(prod)
            res.status(200).send({respuesta: 'OK', mensaje: 'Producto actualizado'})
        else
            res.status(404).send({respuesta: 'Error en actualizar producto', mensaje: 'Not found'})
    } catch(error) {
        res.status(400).send({respuesta: 'Error en actualizar producto', mensaje: error})
    }   
})

productRouter.delete('/:id', async (req,res) => {
    const {id} = req.params
   
 
    try{
        const prod = await productModel.findByIdAndDelete (id)
        if(prod)
            res.status(200).send({respuesta: 'OK', mensaje: 'Producto eliminado'})
        else
            res.status(404).send({respuesta: 'Error en eliminar producto', mensaje: 'Not found'})
    } catch(error) {
        res.status(400).send({respuesta: 'Error en eliminar producto', mensaje: error})
    }   
})




export default productRouter