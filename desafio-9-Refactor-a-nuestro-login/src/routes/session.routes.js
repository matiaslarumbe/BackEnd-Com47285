import { Router } from "express";
import passport from "passport";
import { Authorization, passportError } from "../utils/messagesError.js";
import { generateToken } from "../utils/jwt.js";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), async (req, res) => {
   try {
    if(!req.user) {
        return res.status(401).send({mensaje: "usuario invalido"})
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name, 
        age: req.user.age, 
        email: req.user.email,  
    }

    const token = generateToken(req.user)
    res.cookie('jwtCookie', token, {
        maxAge: 43200000
    })

    res.status(200).send({ payload: req.user })

   } catch (error) {
            res.status(500).send({mensaje: `Error al iniciar sesion ${error}`})
   }

})



sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    res.status(200).send({ resultado: 'Usuario deslogueado' })
    // res.redirect('rutaLogin', 200, { resultado: 'Usuario deslogueado' })
})

sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario ya existente" })
        }

        res.status(200).send({ mensaje: 'Usuario registrado' })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` })
    }
})

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req,res) => {
    res.status(200).send({mensaje: 'usuario registrado'})
})

sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req,res) => {
    req.session.user = req.user
    res.status(200).send({mensaje: 'usuario logueado'})
})



sessionRouter.post('/signup', async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    try {
        // Verifica si el usuario ya existe en la base de datos por su correo electrónico
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            res.status(400).send({ resultado: 'El usuario ya existe' });
        } else {
           
            const newUser = new userModel({
                first_name: first_name,
                last_name: last_name,
                age: age,
                email: email,
                password: password
            });

            await newUser.save();

            res.status(201).send({ resultado: 'Registro exitoso' });
        }
    } catch (error) {
        res.status(500).send({ error: `Error en el registro: ${error}` });
    }
})


sessionRouter.get('/testJWT', passport.authenticate('jwt', {session: false }), (req,res) => {
    res.send(req.user)

})

sessionRouter.get('/current', passportError('jwt'), Authorization('user'), (req, res) => {
    res.send(req.user)
})

export default sessionRouter