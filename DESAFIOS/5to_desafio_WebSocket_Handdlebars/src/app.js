//npm run start
import express from 'express'
import { __dirname } from './utils.js'
import appRouter from './routes/index.js'
import {ProductManager} from'../managers/productManager.js'
const products = new ProductManager()

const app = express()

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
    
    socket.on('addProductMessage', data=>{
        products.addProducts({id:data.newUSer.nproductId,title:data.newUSer.nproductTitle,description: data.newUSer.nproductDescription,price: data.newUSer.nproductPrice,
            thumbnail: data.newUSer.nproductThumbnail,stock: data.newUSer.nproductStock,code:data.newUSer.nproductCode})
        console.log('Producto Agregado')
        socket.emit('addedProduct', 'Producto Agregado') 
    })

    socket.on('deleteMessage', data=>{
        products.deleteProduct(data)
        console.log('Producto Eliminado')
        socket.emit('deletedProduct', `Producto con ID:${data} eliminado`) 
    })

})

