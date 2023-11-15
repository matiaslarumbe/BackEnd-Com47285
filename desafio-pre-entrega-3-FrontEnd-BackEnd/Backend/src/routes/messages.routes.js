import { Router } from "express";
import { getMessages, createMessage } from "../controllers/messages.controllers.js";

const messageRouter = Router()

messageRouter.get("/", getMessages);
messageRouter.post("/", createMessage);

export default messageRouter