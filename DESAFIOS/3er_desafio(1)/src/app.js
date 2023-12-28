const {promises} = require('fs')
const express = require('express')
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
let port = 8080

import ProductManager from './desafio02.js';
const products = new ProductManager()
//const productManager = await fs.readFile(path, 'utf-8')

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})

//http://localhost:8080/products
app.get('/api/products', (req, res)=>{
    let readFiles = async ()=>{
        try{
            let productList = await products.readFileProducts()
            return productList
            } catch(error){
                console.log('error01')
            }
    }
    res.send(readFiles())
})

//http://localhost:8080/products/:id
app.get('/api/products/:pid', (req,res)=>{
    let selectProduct = async ()=>{
        try{
            let productList = await products.readFileProducts()
            const {pid}=req.params
            productoSelecto = productList.filter(prod=>prod.id!==parseInt(pid))
            console.log(productoSelecto)
        } catch(error){
            console.log('Producto no existe')
        }
    }
    res.send(selectProduct())
    
})

app.get('/api/products', (req, res)=>{
    const limit = req.query.parseInt(limit);
    if(limit){
        let productList = products.readFileProducts()
        const limitedProducts = productList.slice(0, limit)
        res.send(limitedProducts)
        return;
    }
    res.send()
})


//http://localhost:8080/products
//http://localhost:8080/products?limit=5
//http://localhost:8080/products/2
//http://localhost:8080/products/34123123
