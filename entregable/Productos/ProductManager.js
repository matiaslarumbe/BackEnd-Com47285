import { promises as fs } from 'fs';
import setPathData from "../ayudantes/setPathData.js";
let products= [];

export default class ProductManager {
    constructor(path){
        this.products = products;
        this.path = path;
    }

    //addProduct
      async addProduct(newProduct) { 
        try {
            console.log(`========\n${this.path}\n========`)
            const directory = await setPathData(this.path);
           // this.path = directory
        if (directory !== '') {
            const data = await fs.readFile(directory);
            const products = JSON.parse(data);
            newProduct.id = this.#idGenerate(products);
            products.push(newProduct);

            const json_products = JSON.stringify(products);
            await fs.writeFile(directory, json_products, 'utf-8');
        }
            return newProduct;
        } catch (error) {
            console.log(error)
            
        }

}
    //getProdcuts
    async getProducts(){
        try {
        const data = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        return products;
        } catch (error) {
            console.log(error)
        }
    }

    //getProductById
    async getProductByid(id){
        const data = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const product = products.filter(product => product.id == id);
        if(product != ''){
            return product[0];
        }else{
            throw new Error("Not found");
        }
    }

    //delete by id 
   deleteById = async (id)=>{
        const findId = await this.getProductByid(id)
        if(findId != ''){
            const data = await fs.readFile(this.path, 'utf-8');
            let  products = JSON.parse(data);
            products= products.filter(product => product.id !== findId.id)
          const json_products=JSON.stringify(products)
          await fs.writeFile(this.path,json_products,'utf-8')
             
            return {message:"Product deleted"}
            
           }else{
            throw new Error("Not found");
           }
      }

    //delete all 
    deleteAll = ()=>{
        const json_products=JSON.stringify(this.products);
        fs.writeFile(this.path,json_products,'utf-8');
      }
    
    /* updateProductOld
     Este metodo se depreco , ya que su implementacion eliminaba todo el objeto persistido y despues resscribia con el update.
    */
    updateProductOld = async (productUpdate) =>{
        const findProduct = this.getProductByid(productUpdate.id)

        if(findProduct != ''){
             await  this.deleteById(productUpdate.id)
             const data = await fs.readFile(this.path, 'utf-8');
             let  products = JSON.parse(data);
              products.push(productUpdate);
              const json_products=JSON.stringify(products);
             fs.writeFile(this.path,json_products,'utf-8');
            
             return findProduct;
           }else{
                 throw new Error("Not found");
           }
    }
    
    // Metodo privado que genera un id incremental desde el largo de un array
    #idGenerate = (array)=>{
        return array.length + 1;
    }

     //update refactor  
    updateProduct = async (productUpdate) =>{
        const data = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
       const updatedProducts = products.map((product) => {
        if (product.id === productUpdate.id) {
          return productUpdate;
        } else {
          return product;
        }
      });
       const json_products=JSON.stringify(updatedProducts)
       await fs.writeFile(this.path,json_products,'utf-8')
       
       return productUpdate;
        
    }

}


// export default class ProductManager {
//     constructor(){
//         this.products = []
//     }

//     //addProduct
//      addProduct(product) {
//         console.log(this.products)
//      if(!this.#validateIdCode(product.code)){
//         return this.products.push(product);  
//      }
// }
//     //getProdcuts
//     getProducts(){
       
//         return this.products;
//     }

//     //getProductById
//     getProductByid(id){
//         const product = this.products.filter(product => product.code == id);
//         if(product != ''){
//             return product;
//         }else{ 
//             throw new Error("Not found");
//         }
//     }

//     // Metodo privado para validar la existencia de un code
//     #validateIdCode(idCode){
//         const product = this.products.filter(product => product.code == idCode)
//         if(product != ''){
//             throw new Error("Id Code exist");
//         }else{
//             return false;
//         }
//     }

// }