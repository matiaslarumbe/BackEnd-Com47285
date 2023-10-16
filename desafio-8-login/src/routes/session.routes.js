import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        if (req.session.login) {
            return res.status(200).send({ resultado: 'Login ya existente' })
        }
        const user = await userModel.findOne({ email: email })

        if (user) {
            if (user.password == password) {
                req.session.login = true
                res.status(200).send({ resultado: 'Login valido', message: user })
                // res.redirect('rutaProductos', 200, { 'info': 'user' }) //Redireccion
            } else {
                res.status(401).send({ resultado: 'Credenciales Incorrectas', message: password })
            }
        } else {
            res.status(404).send({ resultado: 'Not Found', message: user })
        }

    } catch (error) {
        res.status(400).send({ error: `Error en Login: ${error}` })
    }
})

sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    //res.status(200).send({ resultado: 'Usuario deslogueado' })
    res.redirect('rutaLogin', 200, { resultado: 'Usuario deslogueado' })
})

sessionRouter.post('/signup', async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    try {
        // Verifica si el usuario ya existe en la base de datos por su correo electrónico
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            res.status(400).send({ resultado: 'El usuario ya existe' });
        } else {
            // Crea un nuevo usuario y guárdalo en la base de datos
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
});

export default sessionRouter