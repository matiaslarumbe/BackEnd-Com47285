import { Router } from "express";
import userRouter from "./users.routes.js";
import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import messageRouter from "./messages.routes.js";
import sessionRouter from "./session.routes.js";
import mockRouter from "./mock.routes.js";
import loggerRouter from "./logger.routes.js";

const router = Router()

router.use('/api/users', userRouter)
router.use('/api/products',productRouter)
router.use('/api/carts',cartRouter)
router.use('/api/sessions',sessionRouter)
router.use('/api/messages',messageRouter)
router.use('/api/mockingproducts', new mockRouter().router);
router.use('/api/logger', loggerRouter)


export default router
