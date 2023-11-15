import { Router } from "express";
import { getUsers, getUserById, updateUserById, deleteUserById } from "../controllers/users.controllers.js";

const userRouter = Router()


userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', updateUserById)
userRouter.delete('/:id', deleteUserById)

export default userRouter