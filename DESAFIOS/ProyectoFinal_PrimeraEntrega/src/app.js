//npm run start:dev

const express = require('express')
const app = express()

const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('./api/products', productsRouter)

let port = 8080
app.listen(port, ()=>{
    console.log('Escuchando en el puerto 8080')
})


app.use('/api/users', usersRouter)
app.use('/api/carts', cartsRouter)


//http://localhost:8080/products
//http://localhost:8080/products?limit=5
//http://localhost:8080/products/2
//http://localhost:8080/products/34123123