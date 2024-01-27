import { Router } from 'express'
import {productsRouter} from'./products.router.js'
import {cartsRouter} from'./carts.router.js'
import { messagesRouter } from './messages.router.js'

const router = Router()
 
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/messages', messagesRouter)
// router.use('/api/proudcts',(request, responses)=>{})
// router.use('/api/carts',(request, responses)=>{})

export default router