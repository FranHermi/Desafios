//import {CartsManager} from '../mongoDB/_dao/Dao/managers/cartsManager.js'
import { Router } from 'express'
import { cartsModel } from '../mongoDB/_dao/models/carts.model.js'
//const cartsService = new CartsManager()
export const cartsRouter = Router()

cartsRouter
    .post('/', async (req, res)=>{
        // try {
        //     const result = await cartsService.createCart()
        //     console.log(result)
        //     res.send({
        //         stauts: 'success',
        //         payload: result
        //     })
        // } catch (error) {
        //     res.status(500).send(`Error de server ${error.message}`)
        // }
        try {
            const totalCarts= await cartsModel.find()
            const insertCart = await cartsModel.insertOne({cartId:newCart.cartId,products:newCart.products})
            let newCart = {
                cartId: totalCarts.length + 1,
                products : []
            }
            insertCart()

            res.send(`Creado Carrito con ID:${cartId}`)
        } catch (error) {
            console.log('Error01 cartsRouter: POST')
            res.status(500).send(`Error de server ${error.message}`)
        }
    })
    .get('/:cid', async (req, res)=>{
        try {
            const {cid} = req.params
            //const cart = await cartsService.getCartById(parseInt(cid))
            const cart = await cartsModel.find({cartId:cid})
            res.send({
                status: 'success',
                payload: cart
            })
        } catch (error) {
            console.log('Error02 cartsRouter: GET Carrito no encontrado')
        }
    })
    .post('/:cid/products/:pid', async (req, res)=>{
        try {
            const {cid, pid} = req.params
            const getCartById = await cartsModel.find({cartId:cid})
            if(!getCartById){
                console.log('Error03 cartsRouter: getCartById: Carrito not found')
            }
            const product= await productsModel.find({productId:pid})
            if(!product){
                console.log('error04 cartsRouter: Product not Found')
            }
            const arrayProductos=getCartById.products.sort()
            if(arrayProductos.length<1){
                let newProductCart=await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:pid, quantity: 1}}})
                newProductCart()
            }
            const Elementos=[]
            const VecesRepetidas=[]
            let contador= 1
            if(arrayProductos.length>=1){
                arrayProductos.forEach(async produc => {
                    if(arrayProductos[produc+1]===arrayProductos[produc]){
                        contador++
                    }else{
                        Elementos.push(arrayProductos[produc])
                        VecesRepetidas.push(contador)
                        contador=1
                        thisProduct=Elementos[produc]
                        let newProductCart=await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:thisProduct.productId, quantity: contador}}})
                        newProductCart()
                    }
                });
                Elementos.forEach( async producto=>{
                    // let producto=arrayProductos[producto]
                    // const carritoUpdate= await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:pid, quantity: 1}}})
                    thisProduct=Elementos[producto]
                    let newProductCart=await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{productId:thisProduct.productId, quantity: VecesRepetidas[producto]}}})
                    newProductCart()
                })
            }
            const cart = await cartsModel.find({cartId:cid})
            console.log(cart)
            
            res.send({
                status: 'success',
                payload: cart
            })
            //const result = await cartsService.addProductToCart(Number(cid), Number(pid))
            // const result= 
            // res.send({
            //     status: 'success',
            //     payload: result
            // })
        } catch (error) {
            console.log('Error04 cartsRouter: POST addProductToCart')
        }
        
    })

