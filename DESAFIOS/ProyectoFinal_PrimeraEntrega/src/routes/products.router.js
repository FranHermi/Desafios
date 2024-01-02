const express = require('express')
const ProductManager=require('../managers/productManager')
const products = new ProductManager()

const router = express.Router()
router
    .get('/', async (req, res)=>{
        let productList = await products.readFileProducts()
        console.log(productList)
        res.send(productList)
    })
    .get('/', async (req, res)=>{
        const limit = req.query.parseInt(limit);
        if(limit){
            let productList = await products.readFileProducts()
            const limitedProducts = productList.slice(0, limit)
            res.send(limitedProducts)
        }
    })
    //http://localhost:8080/api/products/:id
    .get('/:pid', async (req,res)=>{
        let productList =  await products.readFileProducts()
        const {pid}=req.params
        productoSelecto = productList.filter(prod=>prod.id!==parseInt(pid))
            
        res.send(productoSelecto)
    })
    .post('/:ptitle/:pdescription/:pcode/:pprice/:pstatus/:pstock/:pcategory/:pthumbnails', async (req, res)=>{
        await products.readFileProducts()
        const {ptitle, pdescription, pcode, pprice, pstatus, pstock, pcategory, pthumbnails}=req.params
        products.addProducts({title:ptitle, description: pdescription, code:pcode, price: pprice,status: pstatus, stock: pstock, category: pcategory, thumbnail: pthumbnails})
        res.send(`Producto ${this.id} creado`)
    })
    .put('/:pid', async (req,res)=>{
        await products.readFileProducts()
        const { pid }=req.params
        let body = req.body
        products.updateProduct(pid, body.campo, body.update)
        //updateProduct(pid, campo, update)
        res.send(`Producto ${pid} actualizado`)
    })
    .delete('/:pid', async (req,res)=>{
        await products.readFileProducts()
        const { pid }=req.params
        deleteProduct(pid)
        //deleteProduct(pid)
    })


module.exports = router
