import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

export const createCart = async (req, res) => {
    try {
        const respuesta = await cartModel.create({});
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
    } catch (error) {
        res.status(400).send({ respuesta: "Error", mensaje: error });
    }
};

export const getCartById = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartModel.findById(id);
        if (cart)
            res.status(200).send({ respuesta: 'OK', mensaje: cart });
        else
            res.status(404).send({ respuesta: 'Error en consultar carrito', mensaje: 'Not found' });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar carrito', mensaje: error });
    }
};

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid);
            if (prod) {
                const productIndex = cart.products.findIndex(product => product.id_prod === pid);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity = quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }
                const respuesta = await cart.save();
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto al carrito', mensaje: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto al carrito', mensaje: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en agregar producto al carrito', mensaje: error });
    }
};

export const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = cart.products.filter(product => product.id_prod !== pid);
            const respuesta = await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error al eliminar producto del carrito', mensaje: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al eliminar producto del carrito', mensaje: error });
    }
};

export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = products;
            const respuesta = await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error al actualizar carrito', mensaje: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al actualizar carrito', mensaje: error });
    }
};

export const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const productIndex = cart.products.findIndex(product => product.id_prod === pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                const respuesta = await cart.save();
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            } else {
                res.status(404).send({ respuesta: 'Error al actualizar producto en el carrito', mensaje: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error al actualizar producto en el carrito', mensaje: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al actualizar producto en el carrito', mensaje: error });
    }
};

export const removeAllProductsFromCart = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            cart.products = [];
            const respuesta = await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error al eliminar productos del carrito', mensaje: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al eliminar productos del carrito', mensaje: error });
    }
};
