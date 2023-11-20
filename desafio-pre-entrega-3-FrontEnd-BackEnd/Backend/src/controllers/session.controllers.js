import { generateToken } from "../utils/jwt.js";
import { userModel } from "../models/users.models.js";

export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Usuario inválido" });
        }

        // req.session.user = {
        //     first_name: req.user.first_name,
        //     last_name: req.user.last_name,
        //     age: req.user.age,
        //     email: req.user.email,
        // };

        const token = generateToken(req.user);
       

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesión: ${error}` });
    }
};

export const logout = (req, res) => {
    // if (req.session.login) {
    //     req.session.destroy();
    // }
    res.clearCookie('jwtCookie');
    res.status(200).send({ resultado: 'Usuario deslogueado' });
};

export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario ya existente" });
        }

        res.status(200).send({ mensaje: 'Usuario registrado' });
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario: ${error}` });
    }
};

export const githubLogin = (req, res) => {
    res.status(200).send({ mensaje: 'Usuario registrado' });
};

export const githubCallback = (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: 'Usuario logueado' });
};

export const signup = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            res.status(400).send({ resultado: 'El usuario ya existe' });
        } else {
            const newUser = new userModel({
                first_name: first_name,
                last_name: last_name,
                age: age,
                email: email,
                password: password,
            });

            await newUser.save();

            res.status(201).send({ resultado: 'Registro exitoso' });
        }
    } catch (error) {
        res.status(500).send({ error: `Error en el registro: ${error}` });
    }
};

export const testJWT = (req, res) => {
    res.send(req.user);
};

export const getCurrentUser = (req, res) => {
    res.send(req.user);
};
