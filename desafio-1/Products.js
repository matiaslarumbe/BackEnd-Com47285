export default class Product {
    static #count = 1;

    constructor(title, description, price, thumbnail, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = Product.#count++; 
        this.stock = stock 
    }
}