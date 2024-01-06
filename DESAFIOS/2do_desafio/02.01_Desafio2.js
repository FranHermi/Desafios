const { promises: fs } = require('fs')
class ProductManager {
    constructor(){
        this.products = []
        this.path = fs.writeFile('./ProductPath.json', products, 'utf-8')
    }
    getProducts(){
        return this.products
    }
    addProducts(product){
        if( !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock)
            {
                return 'Faltan llenar campos del producto'
            }
            const result = this.products.find( prod => prod.code === product.code)
            if (result){
                return 'Product already exists'
            }
            if(this.products.length === 0){
                product.id =1
                this.products.push( product)
            }else{
                product.id = this.products.length+1
                this.products.push( product)
            }
            return 'Producto grabado'
            
    }
  
    getProductById(pid){
        const result = this.products.find(prod => prod.id === pid)
        if(!result){
            return 'not found'
        }
        return result
    }

    updateProduct(pid, campo, update){
        const updateArch = async () => {
        try{
            campo = this.campo
            if(!campo){
                return console.log('Campo no existente')
            }
            const dataJson = await fs.readFile('./ProductPath.json', 'utf-8')
            const parseJson = JSON.parse(dataJson)
            const productJson = parseJson.find(prod => prod.id === pid)
            if(!productJson){
                return console.log('No existe el producto')
            } productJson.campo = update

        }catch(err){
            console.log('Error02')
        }
        }
        updateArch()
    }
    deleteProduct(pid){
        const deleteArch = async () => {
            try{
                const dataJson = await fs.readFile('./ProductPath.json', 'utf-8')
                const jsonParse = JSON.parse(dataJson)
                const productJson = jsonParse.find(prod => prod.id === pid)
                if(productJson){
                    let newParseJson = jsonParse.filter((product)=>{
                        return product.pid!=pid;
                    });
                    jsonParse=[...newParseJson]
                }
                await fs.unlink('./ProductPath.json')
                const jsonStr = JSON.stringify(jsonParse, 'utf-8')
                await fs.writeFile('./ProductPath.json', jsonStr, 'utf-8')

            }catch(err){
                console.log('Error02')
            }
            }
            deleteArch()
    }
}
  const products = new ProductManager()
  console.log(products.addProducts({title:'producto uno', description: 'esto es un producto', price: 1000, thumbnail: 'imagen', stock: 150, code:'abc123'}))
  console.log(products.addProducts({title:'producto dos', description: 'esto es un producto2', price: 2000, thumbnail: 'imagen', stock: 150, code:'abc1234'}))
  console.log(products.getProductById(3))