//import {promises as fs}  from 'fs'
import {cartsModel} from '../../models/carts.model.js'
import { productsModel } from '../../models/products.model.js'

export class CartsManager {
    constructor(cartId){
        this.cartId=cartId
        this.products=[]
    }

    // async readFile(){
    //     try {
    //         const dataCarts = await fs.readFile(this.path, 'utf-8') 
    //         return JSON.parse(dataCarts)
    //     } catch (error) {
    //         return []
    //     }
    // }
    async getCarts(){
        try {
            const carts = await cartsModel.find().pretty()
            carts()
        } catch (error) {
            console.log('error01 getCarts')
        }
    }
    async createCart(){
        try {
            //const carts = await this.readFile()
            const totalCarts= await this.getCarts()
            const insertCart = cartsModel.insertOne({cartId:newCart.cartId,products:newCart.products})
            let newCart = {
                cartId: totalCarts.length + 1,
                products : []
            }
            insertCart()
            // carts.push(newCart)
            // await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            // return newCart
        } catch (error) {
            console.log('error01 createCart')
        }
    }
    async getCartById(cid){
        try{
            // const carts = await this.readFile()
            // const cart = carts.find(cart => cart.id=== cid)
            const result = await cartsModel.find({cartId:cid}).pretty() //productList.find(prod => prod.id === Number(pid))
            if(!result){
                console.log('error01 getCartById: Carrito not found')
            }
            result()
            } catch(error){
                console.log('error02 getCartById')
            }
    }
    async addProductToCart(cid, pid){
        try {
            // const carts = await this.readFile()
            // const cartIdx = carts.findIndex(cart => cart.id=== cid)
            // if(cartIdx === -1){
            //     return 'no existe el carrito'
            // }
            // const productIdx = carts[cartIdx].products.findIndex(produc => produc.product === pid)
            // if(productIdx === -1){            
            //     carts[cartIdx].products.push({
            //         product: pid,
            //         quantity: 1
            //     })
            // }else{            
            //     carts[cartIdx].products[productIdx].quantity += 1
            // }
            // await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            // return carts[cartIdx]
            const result = await getCartById(cid)
            if(!result){
                console.log('error01 addProductToCart: Cart not Found')
            }
            const product= await productsModel.find({productId:pid})
            if(!product){
                console.log('error02 addProductToCart: Product not Found')
            }
            const arrayProductos=result.products.sort()
            if(arrayProductos.length<1){
                let newProductCart=await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:pid, quantity: 1}}})
                newProductCart()
            }
            const unicosElementos=[]
            const almacenadorVecesRepetidas=[]
            let quant= 1
            if(arrayProductos.length>=1){
                arrayProductos.forEach(async produc => {
                    if(arrayProductos[produc+1]===arrayProductos[produc]){
                        quant++
                    }else{
                        unicosElementos.push(arrayProductos[produc])
                        almacenadorVecesRepetidas.push(quant)
                        quant=1
                        thisProduct=unicosElementos[produc]
                        let newProductCart=await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:thisProduct.productId, quantity: quant}}})
                        newProductCart()
                    }
                });
                unicosElementos.forEach( async producto=>{
                    // let producto=arrayProductos[producto]
                    // const carritoUpdate= await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:pid, quantity: 1}}})
                    thisProduct=unicosElementos[producto]
                    let newProductCart=await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:thisProduct.productId, quantity: almacenadorVecesRepetidas[producto]}}})
                    newProductCart()
                })
            }
        } catch (error) {
            console.log('error03 addProductToCart')
        }
    }
}
