import { Router } from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById, createUser, uploadDocuments, handleDocumentUpload, deleteInactiveUsers } from "../controllers/users.controllers.js";

const userRouter = Router()


userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.put('/:id', updateUserById)
userRouter.delete('/:id', deleteUserById)
userRouter.post('/', createUser) 
userRouter.post('/:uid/documents', uploadDocuments);
userRouter.post('/:uid/documents', handleDocumentUpload);
userRouter.delete('/', deleteInactiveUsers);

export default userRouter
