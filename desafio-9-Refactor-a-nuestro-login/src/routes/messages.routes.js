import { Router } from "express";
import {messageModel} from "../models/messages.models.js"


const messageRouter = Router()

messageRouter.get("/", async(req, res) => {
    const { limit } = req.query;
    try {
        const getMessages = await messageModel.find().limit(limit);
        res.status(200).send({ response: "ok", mensaje: getMessages });
    } catch (error) {
        res.status(400).send({ response: "Error", messsage: error });
    }
});

messageRouter.post("/", async(req, res) => {
    const { email, message } = req.body;
    try {
        const messages = await messageModel.create({ email, message });
        res.status(200).send({ response: "Mensaje enviado", mensaje: messages });
    } catch (error) {
        res.status(400).send({ response: "Error", messsage: error });
    }
});

export default messageRouter