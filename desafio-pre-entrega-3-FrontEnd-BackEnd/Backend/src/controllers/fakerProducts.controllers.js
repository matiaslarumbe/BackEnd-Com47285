import { fakerProductsModel } from "../models/fakerProducts.models.js";
import { faker } from "@faker-js/faker";
import { generateProduct } from "../utils/generateFakerProducts.js";

export default class FakerProductsController {
  constructor() {}

  async createFakerProducts(req, res) {
    try {
      for (let i = 0; i < 100; i++) {
        const createdProduct = await fakerProductsModel.create(
          generateProduct()
        );
        
        console.log("Created Product:", createdProduct);
      }
      res.status(200).send({
        message: "Productos creados con éxito",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        message: "Error al generar productos falsos",
        error: error.message,
      });
    }
  }
}
