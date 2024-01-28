import { Router } from "express";
import { sendRecoveryMail } from "../config/nodemailer.js";
import jwt from 'jsonwebtoken';
import { userModel } from "../models/users.models.js";
import { createHash } from '../utils/bcrypt.js';

const recoveryRouter = Router();

recoveryRouter.post('/password-recovery', async (req, res) => {
    const { email } = req.body;
    console.log(`Buscando usuario con correo electrónico: ${email}`);

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            console.log(`Usuario con correo electrónico ${email} no encontrado`);
            return res.status(404).send('Usuario no encontrado');
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const recoveryLink = `http://localhost:4000/api/recovery/reset-password/${token}`;

        sendRecoveryMail(email, recoveryLink);

        res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        console.log(`Error al buscar usuario: ${error.message}`);
        res.status(500).send(`Error al enviar el mail ${error}`);
    }
});

recoveryRouter.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword, newPassword2 } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        if (newPassword === newPassword2) {
            // Verificar que la nueva contraseña cumpla con tus criterios de seguridad
            if (isValidPassword(newPassword)) {
                const user = await userModel.findOne({ email });

                if (!user) {
                    return res.status(404).send('Email incorrecto');
                }

                // Hashear la nueva contraseña antes de guardarla
                const passwordHash = createHash(newPassword);
                user.password = passwordHash;

                await user.save();

                res.status(200).send('Contraseña modificada correctamente');
            } else {
                res.status(400).send('La nueva contraseña no cumple con los criterios de seguridad');
            }
        } else {
            res.status(400).send('Las contraseñas deben ser idénticas');
        }
    } catch (error) {
        res.status(500).send(`Error al modificar contraseña ${error}`);
    }
});

// Función para validar la fortaleza de la contraseña
function isValidPassword(password) {
    return password.length >= 8;
}

export default recoveryRouter;

