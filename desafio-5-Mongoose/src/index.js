import express from "express";
import multer from 'multer'
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img') //null hace referencia a que no envia errores
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //Concateno el nombre original de mi archivo con milisegundos con Date.now()
    }
})


//Route
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/message', messageRouter)

// app.get('/static', (req, res) => {
//     res.render('home')
//   })
app.get('/static', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Chat",
        js: "realTimeProducts.js"

    })
})
 


const server = app.listen(PORT, () => {
    console.log(`Serven on Port ${PORT}`)

})
server.on('error', (error) => {
    console.error('Error al iniciar el servidor:', error);
});


// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

 //Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')  //Sentings de handlebars
app.set('views', path.resolve(__dirname, './views')) //Ruta de vistas
const upload = multer({ storage: storage })
app.use('/static', express.static(path.join(__dirname, '/public'))) //Unir rutas en una sola concatenandolas


//socket
const io = new Server(server)
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



