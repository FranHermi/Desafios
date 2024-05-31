//npm run start
import express from 'express'
import { __dirname } from './utils.js'
import appRouter from './routes/index.js'
//import {ProductManager} from'./mongoDB/_dao/Dao/managers/productManager.js'
import { Server as ServerIO } from 'socket.io' 
import { connectDB } from './config/connectDB.js'//importo la funcion para conectar a la DB desde connectDB.js
import { productsModel } from './mongoDB/_dao/models/products.model.js'
import { messageModel } from './mongoDB/_dao/models/messages.model.js'
import { cartsModel } from './mongoDB/_dao/models/carts.model.js'
//const products = new ProductManager()

const app = express()

connectDB()//conecto a la DB
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.use(appRouter)

const port = 8080 || process.env.port//por defecto usa el puerto 8080 y si está ocupado el server lo configura usandola como variable de entorno con "process.env.port"

const httpServer = app.listen(port, ()=>{
    console.log('Escuchando en el puerto 8080')
})

// socket del lado del server
const io = new ServerIO(httpServer)

io.on('connection', socket =>{
    console.log('cliente conectado')
    socket.on('addProductMessage', async data=>{
        const newProduct = await productsModel.insertOne({productId:data.id, title:data.title, description: data.description,price: data.price, stock:data.stock,
                                                          code: data.code, category: data.category,status: data.status, thumbnail: data.thumbnail})
        newProduct
    })

    socket.on('deleteMessage', async data=>{
        //products.deleteProduct(data)
        const deleteProduct= await productsModel.updateOne({productId:data},{isActive:false})
        deleteProduct
        console.log('Producto Eliminado')
        socket.emit('deletedProduct', `Producto con ID:${data} eliminado`) 
    })

    socket.on('addToProduct', async data=>{
        const getCartById = await cartsModel.find({cartId:data.cart})
        const product= await productsModel.find({productId:data.id})
        const cartProdId = getCartById.products
            let quant = 1
            if(cartProdId.product.ref===product.productId){
                quant++
            }
        const addProductCart = await cartsModel.updateOne({cartId:data.cart}, {$addToSet:{products:{product:{ref:data.id, cantidad:quant}}}})
        addProductCart
        socket.emit('agregado', 'Producto Agregado al carrito')
    })
    //____________________________________________________________________________________________________
    //Chat en vivo
    let mensajes= messageModel.find()
    socket.on('message', async data => {
        console.log(data)
        const messageList= await messageModel.find()
        const newId= messageList.length+1
        const newMessage = await messageModel.insertOne({messageId:newId, user:data.user, message:data.message})
        newMessage
        
        io.emit('messageLogs', mensajes)
    })

})
