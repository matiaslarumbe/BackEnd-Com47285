import { messageModel } from "../models/messages.models.js";

export const getMessages = async (req, res) => {
    const { limit } = req.query;
    try {
        const getMessages = await messageModel.find().limit(limit);
        res.status(200).send({ response: "OK", mensaje: getMessages });
    } catch (error) {
        res.status(400).send({ response: "Error", message: error });
    }
};

export const createMessage = async (req, res) => {
    const { email, message } = req.body;
    try {
        const createdMessage = await messageModel.create({ email, message });
        res.status(200).send({ response: "Mensaje enviado", mensaje: createdMessage });
    } catch (error) {
        res.status(400).send({ response: "Error", message: error });
    }
};
