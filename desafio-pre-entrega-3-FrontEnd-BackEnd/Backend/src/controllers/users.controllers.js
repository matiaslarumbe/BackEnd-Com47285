import { userModel } from "../models/users.models.js";
import multer from 'multer';
import { sendRecoveryMail } from "../config/nodemailer.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, { first_name: 1, last_name: 1, email: 1 });
        res.status(200).send({ respuesta: 'OK', mensaje: users });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuarios', mensaje: error });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user });
        } else {
            res.status(404).send({ respuesta: 'Error en consultar usuario', mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuario', mensaje: error });
    }
};

export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age, email, password } = req.body;
    try {
        const user = await userModel.findByIdAndUpdate(id, { first_name, last_name, age, email, password });
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user });
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar usuario', mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar usuario', mensaje: error });
    }
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user });
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar usuario', mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar usuario', mensaje: error });
    }
};

export const createUser = async (req, res) => {
    const { first_name, last_name, age, email, password, isPremium } = req.body;
    try {
        const newUser = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password,
            isPremium: isPremium || false  // Valor predeterminado a false si no se proporciona
        });
        res.status(201).send(newUser);
    } catch (error) {
        // Manejar errores
        res.status(400).send({ respuesta: 'Error en crear usuario', mensaje: error });
    }
};

// Utilizando multer y nodemailer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = file.fieldname === 'profile' ? 'profiles' : 'documents';
        cb(null, `uploads/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const uploadDocuments = multer({ storage: storage }).array('documents');

export const handleDocumentUpload = async (req, res) => {
    const { uid } = req.params;
    const uploadedDocuments = req.files.map(file => ({
        name: file.originalname,
        reference: file.path
    }));

    try {
        const user = await userModel.findByIdAndUpdate(uid, {
            $push: { documents: { $each: uploadedDocuments } },
            last_connection: new Date()
        }, { new: true });

        res.status(200).send({ respuesta: 'OK', mensaje: user });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en subir documentos', mensaje: error });
    }
};

export const deleteInactiveUsers = async (req, res) => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const deletedUsers = await userModel.find({ last_connection: { $lt: twoDaysAgo } });

        // Enviar correos a los usuarios eliminados
        for (const user of deletedUsers) {
            const recoveryLink = 'https://localhost:4000/recovery/' + user._id; 
            await sendRecoveryMail(user.email, recoveryLink);
        }

        const result = await userModel.deleteMany({ last_connection: { $lt: twoDaysAgo } });

        res.status(200).send({ respuesta: 'OK', mensaje: 'Usuarios inactivos eliminados' });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error al eliminar usuarios inactivos', mensaje: error });
    }
};
