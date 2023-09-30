import 'dotenv/config'
import express from "express";
import multer from 'multer'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { engine } from "express-handlebars";
import { __dirname } from './path.js'
import { Server } from 'socket.io'
import path from 'path'


import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import messageRouter from "./routes/messages.routes.js";
import sessionRouter from './routes/session.routes.js';





const app = express()
const PORT = 4000

mongoose.connect(process.env.MONGO_URL)
    .then(async() => {
        console.log('BDD conectada')
   
})
    .catch(() => console.log('Error en conexion a la BDD'))

   

//Middlewares
app.use(express.json())
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 30
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img') //null hace referencia a que no envia errores
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //Concateno el nombre original de mi archivo con milisegundos con Date.now()
    }
})

// const auth = (req,res,next) => {
//     if(req.session.email == "admin@admin.com" && req.session.password == "1234" ) {
//         return next()
//     }

//     return res.send("No tenes acceso a esta ruta")
// } 


//Route
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/message', messageRouter)
app.use('/api/sessions', sessionRouter)

// //cookies
// app.get('/setCookie', (req, res) => {
//     res.cookie('CookieCookie', 'Estos es una cookie',{ maxAge: 10000, signed: true }).send('Cookie generada')

// })
// app.get('/getCookie', (req, res) => {
//     res.send(req.signedCookies)

// })
// //session
// app.get('/session', (req, res) => {
//     if(req.session.counter) {
//         req.session.counter++
//         res.send(`Ingreso ${req.session.counter} veces`)
//     }else{
//         req.session.counter = 1
//         res.send('Ingreso por primera vez')
//     }
// })

// app.get('/login', (req, res) => { 
//     const {email, password} = req.body

//     req.session.email = email
//     req.session.password = password
//     console.log( req.session.email)
//     console.log( req.session.password)

//     return res.send('Usuario logueado')

// })

// app.get('/admin', auth, (req, res) => { 
   
//     res.send('Sos admin')

// })




// app.get('/static', (req, res) => {
//     res.render('chat', {
//         css: "style.css",
//         title: "Chat",
//         js: "script.js"
//     })
// })


// app.get('/static', (req, res) => {
//     res.render('realTimeProducts', {
//         css: "style.css",
//         title: "realTimeProducts",
//         js: "realTimeProducts.js"

//     })
// })

//session para loguearse
app.get('/login', (req, res) => {
    res.render('login', {
        css: "style.css",
        title: "login",
        js: "login.js"

    })
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        css: "style.css",
        title: "signup",
        js: "signup.js"

    })
})

app.get('/logout', (req, res) => {
    res.render('logout', {
        css: "style.css",
        title: "productos",
        js: "logout.js"

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

app.use('/login', express.static(path.join(__dirname, '/public')))
app.use('/logout', express.static(path.join(__dirname, '/public')))
app.use('/signup', express.static(path.join(__dirname, '/public')))

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

