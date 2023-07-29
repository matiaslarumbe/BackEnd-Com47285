export default class ProductManager {
    constructor(){
        this.products = []
    }

    //addProduct
     addProduct(product) {
        console.log(this.products)
     if(!this.#validateIdCode(product.code)){
        return this.products.push(product);  
     }
}
    //getProdcuts
    getProducts(){
       
        return this.products;
    }

    //getProductById
    getProductByid(id){
        const product = this.products.filter(product => product.code == id);
        if(product != ''){
            return product;
        }else{
            throw new Error("Not found");
        }
    }

    // Metodo privado para validar la existencia de un code
    #validateIdCode(idCode){
        const product = this.products.filter(product => product.code == idCode)
        if(product != ''){
            throw new Error("Id Code exist");
        }else{
            return false;
        }
    }

}