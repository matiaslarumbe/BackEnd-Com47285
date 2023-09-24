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
// import { cartModel } from "./models/carts.models.js";
import { userModel } from "./models/users.models.js";


const app = express()
const PORT = 4000

mongoose.connect('mongodb+srv://matiaslarumbe:<>@cluster0.anbxejn.mongodb.net/?retryWrites=true&w=majority')
.then(async() => {
    console.log('BDD conectada')
        const resultado = await userModel.paginate()
        console.log(resultado)

    // const resultados = await cartModel.findOne({ _id:'650fddebc509e3ba189dbbd9' })
    // console.log(JSON.stringify(resultados)) //carrito creado en mongoo atlas
})
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
//     res.render('chat', {
//         css: "style.css",
//         title: "Chat",
//         js: "script.js"
//     })
// })


app.get('/static', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "realTimeProducts",
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
const mensajes = []
const prods = []
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit('credencialesConexion', "Usuario valido")
        } else {
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })

    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        socket.emit('mensajes', mensajes)
    })

    socket.on('nuevoProducto', (nuevoProd) => {
        prods.push(nuevoProd)
        socket.emit('prods', prods)
    })
})

