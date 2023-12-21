const { promises: fs } = require('fs')
export default class ProductManager {
    constructor(){
        this.products = []
        this.path='./products.json'
    }
    async readFileProducts(){
        try{
            const productData = await fs.readFile(this.path, 'utf-8')
            const productsJs = await JSON.parse(productData)
            return productsJs

        } catch(error){
            return[]
        }
    }
    async getProducts(){
        try{
            let productList = await this.readFileProducts()//guardo el archivo leido y parseado de readFileProducts en la variable productList
            console.log(productList)//llamo la variable productList para ver el contenido guardado(array products)
            } catch(error){
                console.log('error01')
            }
    }
    async addProducts(product){
        try{
            if( !product.title ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock)
                {
                    return 'Faltan llenar campos del producto'
            }
            let productList = await this.readFileProducts()
            if(!product.id){
                product.id = productList.length+1
            }
            const repetido = this.products.find(prod => prod.code === products.code)
            if (repetido){
                return 'Product already exists'
            }else{
                productList.push(product)
            }
            console.log(productList)
            await fs.writeFile(this.path, JSON.stringify(productList, null, 2))
            } catch(error){
                console.log('error')
            }
        let respuesta = ()=>console.log('Producto grabado')
        respuesta()
    }
  
    async getProductById(pid){
        try{
            let productList = await this.readFileProducts()
            const result = productList.find(prod => prod.id === pid)
            if(result){
                let newProductList = productList
                let newResult = productList.filter((product)=>{
                        return product.pid!=pid;
                })
                let finalProductList= newProductList-newResult
                console.log(finalProductList)
            }else{
                return 'Not found'
            }
            } catch(error){
                console.log('error01')
            }
    }

    async updateProduct(pid, campo, update){
        const updateArch = async () => {
        try{
            campo = this.campo
            if(!campo){
                return console.log('Campo no existente')
            }
            let productList = await this.readFileProducts()
            const productJson = productList.find(prod => prod.id === pid)
            if(!productJson){
                return console.log('No existe el producto')
            } productJson.campo = update

        }catch(err){
            console.log('Error02')
        }
        }
        updateArch()
    }
    async deleteProduct(pid){
        const deleteArch = async () => {
            try{
                let productList = await this.readFileProducts()
                const productJson = productList.find(prod => prod.id === pid)
                if(productJson){
                    let newParseJson = productList.filter((product)=>{
                        return product.pid!=pid;
                    });
                    productList=[...newParseJson]
                }
                const jsonStr = JSON.stringify(productList, 'utf-8')
                await fs.writeFile('./products.json', jsonStr, 'utf-8')

            }catch(err){
                console.log('Error02')
            }
            }
            deleteArch()
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