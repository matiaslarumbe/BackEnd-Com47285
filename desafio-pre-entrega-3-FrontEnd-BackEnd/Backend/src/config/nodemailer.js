import 'dotenv/config'
import nodemailer from 'nodemailer'
import express from 'express'

const app = express()

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'matias.coder.mhl@gmail.com',
        pass: 'eznnjiyngmzyrtwo',
        authMethod: 'LOGIN'
    }
})

export const sendRecoveryMail = (email, recoveryLink) => {
    const mailOptions = {
        from: 'TEST MAIL matias.coder.mhl@gmail.com',
        to: email,
        subject: 'Link para reestablecer su contraseña',
        text: `Haga click en el enlace para reestablecer su contraseña: ${recoveryLink}`
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else
            console.log('Email enviado correctamente')
    })
}

