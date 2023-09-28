import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (req.session.login) {
            res.status(200).send({ resultado: 'Login ya existente' });
        }

        const user = await userModel.findOne({ email: email });

        if (user) {
            if (user.password == password) {
                req.session.login = true;
                res.status(200).send({ resultado: 'Login válido', message: user });
            } else {
                res.status(401).send({ resultado: 'Contraseña inválida', message: password });
            }
        } else {
            res.status(404).send({ resultado: 'Usuario no encontrado', message: user });
        }
    } catch (error) {
        res.status(400).send({ error: `Error en login ${error}` });
    }
});


sessionRouter.get('/producto', (req, res) => {
    if (req.session.login) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).send({ resultado: 'Error al cerrar sesión' });
            } else {
                res.redirect('/producto'); // Redirige al usuario a la página de inicio después de cerrar sesión
            }
        });
    } else {
        res.status(200).send({ resultado: 'Usuario no estaba logueado' });
    }
});


export default sessionRouter