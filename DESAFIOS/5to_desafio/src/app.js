//npm run start:dev

const express = require('express')
const app = express()
const ProductManager = require('./productManager.js')
const products = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
let port = 8080

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})

//http://localhost:8080/api/products
app
    .get('/api/products', (req, res)=>{
    let productList = products.readFileProducts()
    console.log(productList)
    res.send(productList)
})
    .get('/api/products', (req, res)=>{
    const limit = req.query.parseInt(limit);
    if(limit){
        let productList = products.readFileProducts()
        const limitedProducts = productList.slice(0, limit)
        res.send(limitedProducts)
    }
})
//http://localhost:8080/api/products/:id
    .get('/api/products/:pid', (req,res)=>{
    const selectedProduct = ()=>{
        let productList =  products.readFileProducts()
        const {pid}=req.params
        productoSelecto = productList.filter(prod=>prod.id!==parseInt(pid))
        console.log(productoSelecto)
    res.send(selectedProduct)
    }    
})


//http://localhost:8080/products
//http://localhost:8080/products?limit=5
//http://localhost:8080/products/2
//http://localhost:8080/products/34123123