import { Router } from "express";


const prodsRouter = Router()

prodsRouter.get('/', async (req, res) => {
    const { limit } = req.query

    const prods = await productManager.getProducts()
    
    const products = prods.slice(0, limit)

    res.status(200).send(products)
})


prodsRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    const prod = await productManager.getProductById(parseInt(id))
    
    if(prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto no encontrado")
})

prodsRouter.post('/', async (req, res) => {
    const { code } = req.body
    const confirmacion = await productManager.getProductBycode(code)
    if(confirmacion) {
        req.status(400).send("Producto ya encontrado")
        
    } else {
        const conf = await productManager.addProduct(req.body)
        if(conf)
            res.status(200).send("Producto creado")
    }

})

prodsRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const confirmacion = await productManager.getProductById(parseInt(id))

    if(confirmacion) {
        await productManager.updateProduct(parseInt(id), req.body)
        res.status(200).send("Producto actualizado")
        
    } else {
            res.status(404).send("Producto no encontrado")
    }

})


prodsRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    const confirmacion = await productManager.getProductById(parseInt(id))

    if(confirmacion) {
        await productManager.deleteProduct(parseInt(id))
        res.status(200).send("Producto eliminado")
        
    } else {
            res.status(404).send("Producto no encontrado")
    }

})

// Ruta producto
prodsRouter.post('/', async (req, res) => {
    const { limit } = req.body

    const confirmacion = await productManager.addProduct(req.body)

    if(confirmacion) {
        res.status(200).send("Producto creado correctamente")
    } else{
        res.status(400).send("Error en crear producto")
    }
    
    const products = prods.slice(0, limit)

    res.status(200).send(products)
})

prodsRouter.put('/:id', async (req, res) => {
    const { limit } = req.body

    const confirmacion = await productManager.updateProduct(parseInt (req.params.id), req.body)

    if(confirmacion) {
        res.status(200).send("Producto actualizado correctamente")
    } else{
        res.status(400).send("Error en actualizar producto")
    }
    
    const products = prods.slice(0, limit)

    res.status(200).send(products)
})

prodsRouter.delete('/:id', async (req, res) => {
    const { limit } = req.body

    const confirmacion = await productManager.deleteProduct(parseInt (req.params.id), req.body)

    if(confirmacion) {
        res.status(200).send("Producto aeliminado correctamente")
    } else{
        res.status(400).send("Error en eliminar producto")
    }
    
    const products = prods.slice(0, limit)

    res.status(200).send(products)
})


// Rutas

export default prodsRouter