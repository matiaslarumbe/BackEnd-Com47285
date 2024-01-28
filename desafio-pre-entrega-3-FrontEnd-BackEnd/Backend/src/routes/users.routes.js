import { Router } from "express";
import { getUsers, getUserById, updateUserById, deleteUserById, createUser } from "../controllers/users.controllers.js";

const userRouter = Router()


userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', updateUserById)
userRouter.delete('/:id', deleteUserById)
userRouter.post('/', createUser) 

export default userRouter