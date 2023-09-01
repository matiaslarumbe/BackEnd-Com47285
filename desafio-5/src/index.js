import express from 'express'
import multer from 'multer'
import prodsRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import { __dirname } from './path.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'


const PORT = 4000
const app = express()

// Configuracion de imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} ${file.originalname}`)
    }

})

const server = app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`)
})




// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


 app.engine('handlebars', engine()) //Handlebars
 app.set('view engine', 'handlebars')  //Sentings de handlebars
 app.set('views', path.resolve(__dirname, './views')) //Ruta de vistas

 const upload = multer({ storage: storage })
 app.use('/static', express.static(path.join(__dirname, '/public')))


//Server de Socket.io
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



// Routes
app.use('/api/products', prodsRouter)

app.get('/static', (req,res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        js: "realTimeProducts.js",
        home: "home.js"
    })
} )

app.use('/api/carts', cartRouter)

app.post('/upload', upload.single('product'), (req,res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen Cargada")

})
