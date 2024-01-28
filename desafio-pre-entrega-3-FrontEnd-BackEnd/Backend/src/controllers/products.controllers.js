// import {productModel} from "../models/products.models.js"

// export const getProducts = async (req, res) => {
//     const {limit, page, filter, sort} = req.query

//     const pag = page ? page : 1
//     const lim = limit ? limit : 10
//     const ord = sort == 'asc' ? 1 : -1

//     try{
//         const prods = await productModel.paginate({filter: filter}, {limit: lim, page: pag, sort: {price: ord }})

//         if(prods){
//             return res.status(200).send(products)
//         }
//         res.status(404).send({error: "Productos no encontrados"})

//     }catch (error) {
//         res.status(500).send({error: `Error en consultar productos ${error}`})
//     }

// }
  
// export const getProductById = async(req, res) =>{
//     const {id} = req.params

//     try{
//         const prod = await productModel.findById(id)

//         if(prod){
//             return res.status(200).send(product)
//         }
//         res.status(404).send({error: "Productos no encontrados"})

//     }catch (error) {
//         res.status(500).send({error: `Error en consultar producto ${error}`})
//     }

// }

// export const postProduct = async(req, res) =>{
//     const {title, description, code, price, stock, category} = req.body

//     try{
//         const prod = await productModel.create(title, description, code, price, stock, category)

//         if(prod){
//             return res.status(201).send(prod)
//         }
//         res.status(400).send ({error:`Error en crear producto` })
        
//     }catch (error) {
//         if(error.code == 11000) {
//             return res.status(400).send({error: "Producto ya creado con llave duplicada"})
//         }
//         res.status(500).send({error: `Error en crear producto ${error}`})
//     }

// }

// export const putProductById = async(req, res) =>{
//     const {id} = req.params
//     const {title, description, code, price, stock, category} = req.body

//     try{
//         const prod = await productModel.findByIdAndUpdate(id, title, description, code, price, stock, category)

//         if(prod){
//             return res.status(200).send(product)
//         }
//         res.status(404).send({error: "Productos no encontrados"})

//     }catch (error) {
//         res.status(500).send({error: `Error en actualizar producto ${error}`})
//     }

// }

// export const deleteProductById = async(req, res) =>{
//     const {id} = req.params

//     try{
//         const prod = await productModel.findByIdAndDelate(id)

//         if(prod){
//             return res.status(200).send(product)
//         }
//         res.status(404).send({error: "Productos no encontrados"})

//     }catch (error) {
//         res.status(500).send({error: `Error en eliminar producto ${error}`})
//     }

// }
import { productModel } from "../models/products.models.js";
import { userModel } from "../models/users.models.js";


export const getProducts = async (req, res) => {
    const { limit, page, filter, sort } = req.query;

    const pag = page ? parseInt(page) : 1;
    const lim = limit ? parseInt(limit) : 10;
    const ord = sort === 'asc' ? 1 : -1;

    try {
        const products = await productModel
            .find({ filter: filter })
            .sort({ price: ord })
            .skip((pag - 1) * lim)
            .limit(lim);

        if (products.length > 0) {
            return res.status(200).send(products);
        }

        res.status(404).send({ error: "Productos no encontrados" });
    } catch (error) {
        res.status(500).send({ error: `Error en consultar productos ${error}` });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findById(id);

        if (prod) {
            return res.status(200).send(prod);
        }

        res.status(404).send({ error: "Producto no encontrado" });
    } catch (error) {
        res.status(500).send({ error: `Error en consultar producto ${error}` });
    }
};

export const postProduct = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    try {
        const prod = await productModel.create({
            title,
            description,
            code,
            price,
            stock,
            category,
        });

        if (prod) {
            return res.status(201).send(prod);
        }

        res.status(400).send({ error: `Error en crear producto` });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ error: "Producto ya creado con llave duplicada" });
        }

        res.status(500).send({ error: `Error en crear producto ${error}` });
    }
};

export const putProductById = async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, stock, category } = req.body;

    try {
        const prod = await productModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                code,
                price,
                stock,
                category,
            },
            { new: true } // Para obtener el documento actualizado
        );

        if (prod) {
            return res.status(200).send(prod);
        }

        res.status(404).send({ error: "Producto no encontrado" });
    } catch (error) {
        res.status(500).send({ error: `Error en actualizar producto ${error}` });
    }
};

export const deleteProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const prod = await productModel.findByIdAndDelete(id);

        if (prod) {
            return res.status(204).send();
        }

        res.status(404).send({ error: "Producto no encontrado" });
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar producto ${error}` });
    }
};


export const getProductsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

        // Obtener productos y aplicar descuento según el estado "premium" del usuario
        const products = await productModel.find(); 
        const discountedProducts = products.map(product => ({
            ...product._doc,
            price: applyDiscount(product.price, user.isPremium)
        }));

        res.status(200).send({ respuesta: 'OK', mensaje: discountedProducts });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en obtener productos', mensaje: error });
    }
};

export const applyDiscount = (price, isPremium) => {
    if (isPremium) {
        // Aplicar un 10% de descuento para usuarios "premium"
        return price * 0.9;
    }
    return price;
};
 
 