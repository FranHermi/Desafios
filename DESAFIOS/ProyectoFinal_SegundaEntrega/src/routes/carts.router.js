//import {CartsManager} from '../mongoDB/_dao/Dao/managers/cartsManager.js'
import { Router } from 'express'
import { cartsModel } from '../mongoDB/_dao/models/carts.model.js'
import { productsModel } from '../mongoDB/_dao/models/products.model.js'
//const cartsService = new CartsManager()
export const cartsRouter = Router()

cartsRouter
    //.get('/', async (req,res)=>{})
    .post('/', async (req, res)=>{
        try {
            const totalCarts= await cartsModel.find()
            let newCartId =  totalCarts.length + 1
            const insertCart = await cartsModel.insertOne({cartId:newCartId,products:[]})
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
            const cartProdId = getCartById.products
            let quant = 1
            if(cartProdId.product.ref===product.productId){
                quant++
            }
            await cartsModel.updateOne({cartId:cid},{$addToSet:{products:{product:{ref:pid, cantidad:quant}}}})
           
            const cart = await cartsModel.find({cartId:cid})
            console.log(cart)
            
            res.send({
                status: 'success',
                payload: cart
            })
        } catch (error) {
            console.log('Error04 cartsRouter: POST addProductToCart')
        }
        
    })
    .delete(':cid/products/:pid', async (req,res)=>{
        try {
            const {cid, pid} = req.params
            const product = await productsModel.find({productId:pid})
            const productos = product.products
            productos.forEach(element => {
                if(element.ref=pid){
                    const newElementos = productos.filter(element => ref == pid)
                    const actualiz = cartsModel.updateOne({cartId:cid}, {$addToSet:{products:newElementos}})
                    actualiz
                }else{
                    console.log('error: no se encontró el producto en el carrito')
                }
            });


        } catch (error) {
            console.log('error')
        }
    })

