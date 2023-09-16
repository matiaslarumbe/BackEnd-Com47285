import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { __dirname } from './path.js'
import { Server } from 'socket.io'
import path from 'path'

import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import messageRouter from "./routes/messages.routes.js";


const app = express()
const PORT = 4000

mongoose.connect('mongodb+srv://matiaslarumbe:<>@cluster0.anbxejn.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('BDD conectada'))
.catch(() => console.log('Error en conexion a la BDD'))

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/message', messageRouter)

app.listen(PORT, () => {
    console.log(`Serven on Port ${PORT}`)
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

 //Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')  //Sentings de handlebars
app.set('views', path.resolve(__dirname, './views')) //Ruta de vistas

//socket
const io = new Server()
const prods = []

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (info) => {
        console.log(info)
    })
    socket.on('nuevoProducto', (nuevoProd) => {
        prods.push(nuevoProd)
        socket.emit('prods', prods)
    })

})