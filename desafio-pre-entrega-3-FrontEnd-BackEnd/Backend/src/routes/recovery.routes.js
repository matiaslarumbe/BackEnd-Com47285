import { Router } from "express";
import { sendRecoveryMail } from "../config/nodemailer.js";
import jwt from 'jsonwebtoken';

const recoveryRouter = Router();

recoveryRouter.post('/password-recovery', (req, res) => {
    const { email } = req.body;

    try {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generar token JWT

        const recoveryLink = `http://localhost:4000/api/recovery/reset-password/${token}`;

        sendRecoveryMail(email, recoveryLink);

        res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        res.status(500).send(`Error al enviar el mail ${error}`);
    }
});

recoveryRouter.post('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    const { newPassword, newPassword2 } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar y decodificar token
        const { email } = decoded;

        if (newPassword === newPassword2) {
            // Aquí puedes actualizar la contraseña del usuario usando el email
            res.status(200).send('Contraseña modificada correctamente');
        } else {
            res.status(400).send('Las contraseñas deben ser idénticas');
        }
    } catch (error) {
        res.status(500).send(`Error al modificar contraseña ${error}`);
    }
});

export default recoveryRouter;
