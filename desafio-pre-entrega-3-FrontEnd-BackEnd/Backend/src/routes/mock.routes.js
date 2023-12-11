import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import FakerProductsController from "../controllers/fakerProducts.controllers.js";

class MockRouter {
  path = "/api/mockingproducts";
  router = Router();
  fakerProductsController = new FakerProductsController();

  constructor() {
    this.initMocksRoutes();
  }

  initMocksRoutes() {
    this.router.post(
      `${this.path}`,
      passportError("jwt"),
      authorization("user"),
      this.fakerProductsController.createFakerProducts.bind(
        this.fakerProductsController
      )
    );
  }
}

export default MockRouter;
