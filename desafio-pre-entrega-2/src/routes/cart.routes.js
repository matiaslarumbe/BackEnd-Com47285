import { Router } from "express";
import {cartModel} from "../models/carts.models.js"
import { productModel } from "../models/products.models.js";


const cartRouter = Router()




cartRouter.post("/", async (req,res) => {

    console.log("entra")

    try {

        console.log("hola")

        const respuesta = await cartModel.create({})

            res.status(200).send({respuesta: "okay", message: respuesta})

    } catch (error) {

        res.status(400).send({respuesta: "error", message: error})

    }

})

cartRouter.get('/:id', async(req, res) => {
    const {id} = req.params

    try{
        const cart = await cartModel.findById(id)
        if(cart)
        res.status(200).send({respuesta: 'OK', mensaje: cart})
        else
            res.status(404).send({respuesta: 'Error en consultar carrito', mensaje: 'Not found'})
    } catch(error) {
        res.status(400).send({respuesta: 'Error en consultar carrito', mensaje: error})
    }   
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
   const {cid, pid} = req.params
   const {quantity} = req.body

    try{

        const cart = await cartModel.findById(cid)
        if(cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const indice = cart.products.findIndex(prod => prod.id_prod.toString() === pid)
                if (indice != -1) {
                    cart.products[indice].quantity = quantity
                } else {
                    cart.products.push({id_prod: pid, quantity: quantity})
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({respuesta: 'OK', mensaje: respuesta})
            } else{
                res.status(404).send({respuesta: 'Error en agregar carrito', mensaje: 'Product Not found'})
            }
        } else {
            res.status(404).send({respuesta: 'Error en agregar carrito', mensaje: 'Cart Not found'})
        }      
        

    } catch(error) {
        res.status(400).send({respuesta: 'Error en agregrar producto carrito', mensaje: error})
    }   
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            // Filtrar los productos para eliminar el producto con el ID dado
            cart.products = cart.products.filter(product => product.id_prod !== pid);
            const respuesta = await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error al eliminar producto del carrito', mensaje: 'Cart Not found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al eliminar producto del carrito', mensaje: error });
    }
});

// Endpoint para actualizar el carrito con un arreglo de productos
cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            // Asignar el arreglo de productos al carrito
            cart.products = products;
            const respuesta = await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error al actualizar carrito', mensaje: 'Cart Not found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al actualizar carrito', mensaje: error });
    }
});

// Endpoint para actualizar la cantidad de ejemplares de un producto en el carrito
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            // Buscar el producto en el carrito y actualizar su cantidad
            const productIndex = cart.products.findIndex(product => product.id_prod === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                const respuesta = await cart.save();
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            } else {
                res.status(404).send({ respuesta: 'Error al actualizar producto en el carrito', mensaje: 'Product Not found' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error al actualizar producto en el carrito', mensaje: 'Cart Not found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al actualizar producto en el carrito', mensaje: error });
    }
});

// Endpoint para eliminar todos los productos del carrito
cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            // Eliminar todos los productos del carrito
            cart.products = [];
            const respuesta = await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error al eliminar productos del carrito', mensaje: 'Cart Not found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al eliminar productos del carrito', mensaje: error });
    }
});


export default cartRouter