//import { promises as fs } from 'fs'
import { productsModel } from '../../models/products.model.js'

export class ProductManager {
    constructor(productId, title, description, price, thumbnail, stock, code){
        this.productId = productId
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.stock=stock
        this.code=code
    }
    // async readFileProducts(){
    //     try{
    //         const productData = await fs.readFile(this.path, 'utf-8')
    //         const productsJs = await JSON.parse(productData)
    //         return productsJs

    //     } catch(error){
    //         return[]
    //     }
    //}
    async getProducts(){
        try{
            //let productList = await this.readFileProducts()//guardo el archivo leido y parseado de readFileProducts en la variable productList
            const productos = await productsModel.find().pretty()
            console.log(productos)//llamo la variable productList para ver el contenido guardado(array products)
            } catch(error){
                console.log('error01')
            }
    }
    async addProducts(product){
        try{
            const productList = await this.getProducts()
            const insertProduct = await productsModel.insertOne({productId:this.productId,
                title:this.title,
                description:this.description,
                price:this.price,
                thumbnail:this.thumbnail,
                stock:this.stock,
                code:this.code})
            if( !product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock)
                {
                    return 'Faltan llenar campos del producto'
            }
            if(!product.productId){
                product.productId = productList.length+1
            }
            const repetido = await productsModel.find({productId:this.productId}) //this.products.find(prod => prod.code === products.code)
            if (repetido){
                return 'Product already exists'
            }else{
                insertProduct()
            }
            console.log(productList)
            // await fs.writeFile(this.path, JSON.stringify(productList, null, 2))
            } catch(error){
                console.log('error02')
            }
        let respuesta = ()=>console.log('Producto grabado')
        respuesta()
    }
  
    async getProductById(pid){
        try{
            //let productList = await this.readFileProducts()
            const result = await productsModel.find({productId:pid}) //productList.find(prod => prod.id === Number(pid))
            if(result){
                console.log(productsModel.find({productId:pid}).pretty())
            }else{
                return 'Not found'
            }
            } catch(error){
                console.log('error03')
            }
    }

    async updateProduct(pid, campo, update){
        /* const updateArch = async () => {
        try{
            campo === this.products.campo
            if(!campo){
                return console.log('Campo no existente')
            }
            let productList = await this.readFileProducts()
            const productJson = productList.find(prod => prod.id === pid)
            if(!productJson){
                return console.log('No existe el producto')
            } productJson.campo = update

        }catch(err){
            console.log('Error04')
        }
        }
        updateArch() */
        try {
            const productUpdate= productsModel.updateOne({productId:pid},{$set:{campo:update}})
            productUpdate()
        } catch (error) {
            console.log('error04')
        }
        
    }
    async deleteProduct(pid){
        // const deleteArch = async () => {
        //     try{
        //         let productList = await this.readFileProducts()
        //         const productJson = productList.find(prod => prod.id === pid)
        //         if(productJson){
        //             let newParseJson = productList.filter((product)=>{
        //                 return product.pid!=pid;
        //             });
        //             productList=[...newParseJson]
        //         }
        //         const jsonStr = JSON.stringify(productList, 'utf-8')
        //         await fs.writeFile('./products.json', jsonStr, 'utf-8')

        //     }catch(err){
        //         console.log('Error02')
        //     }
        //     }
        //     deleteArch()
        try {
            const productUpdate= productsModel.updateOne({productId:pid},{$set:{isActive:false}})
            productUpdate()
            console.log(productsModel.find({productId:pid}).pretty())
        } catch (error) {
            console.log('error05')
        }
    }
}
const products = new ProductManager()
//console.log(products.addProducts({title:'producto uno', description: 'esto es un producto', price: 1000, thumbnail: 'imagen1', stock: 110, code:'abc111'}))
//console.log(products.addProducts({title:'producto dos', description: 'esto es un producto2', price: 2000, thumbnail: 'imagen2', stock: 120, code:'abc222'}))
//console.log(products.addProducts({title:'producto tres', description: 'esto es un producto', price: 3000, thumbnail: 'imagen3', stock: 130, code:'abc333'}))
//console.log(products.addProducts({title:'producto cuatro', description: 'esto es un producto', price: 4000, thumbnail: 'imagen4', stock: 140, code:'abc444'}))
//console.log(products.addProducts({title:'producto cinco', description: 'esto es un producto', price: 5000, thumbnail: 'imagen5', stock: 150, code:'abc555'}))
//console.log(products.addProducts({title:'producto seis', description: 'esto es un producto', price: 6000, thumbnail: 'imagen6', stock: 160, code:'abc666'}))
//console.log(products.addProducts({title:'producto siete', description: 'esto es un producto', price: 7000, thumbnail: 'imagen7', stock: 170, code:'abc777'}))
//console.log(products.addProducts({title:'producto ocho', description: 'esto es un producto', price: 8000, thumbnail: 'imagen8', stock: 180, code:'abc888'}))
//console.log(products.addProducts({title:'producto nueve', description: 'esto es un producto', price: 9000, thumbnail: 'imagen9', stock: 190, code:'abc999'}))
//console.log(products.addProducts({title:'producto diez', description: 'esto es un producto', price: 10000, thumbnail: 'imagen10', stock: 200, code:'abc101010'}))
//console.log(products.addProducts({title:'producto once', description: 'esto es un producto', price: 11000, thumbnail: 'imagen11', stock: 210, code:'abc111111'}))

//console.log(products.getProductById(3))
//console.log(products.readFileProducts)
//console.log(products.getProducts())
//console.log(products.getProductById(2))
//console.log(products.updateProduct(2, products.title, 'producto DOS'))
//console.log(products.deleteProduct(11))