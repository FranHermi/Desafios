import {ProductManager} from'../managers/productManager.js'
import { Router } from 'express'
const products = new ProductManager()
export const productsRouter = Router()

productsRouter
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
        const productList =  await products.readFileProducts()
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
    .get('/realTimeProducts', (req,res)=>{
        res.render('realtimeproducts', {})// le decimos que renderice el archivo index.handlebars(aunque como configuramos 0handlebar) podemos solo poner index
    })
    .get('/productList', async (req,res)=>{
        let productList = document.querySelector('#productList')
        let thisProductos = await products.readFileProducts()
        thisProductos.forEach(producto => {//de la data que llegó la recorro con un forEach
            let htmlProducts = 
            `<h1>${producto.title}</h1><br>
            <h1>${producto.price}</h1><br>
            <h2>${producto.description}</h2><br>
            <h2>${producto.stock}</h2><br>
            <h2>${producto.code}</h2><br>
            <h2>${producto.id}</h2><br>
            <h2>${producto.thumbnail}</h2><br>
            <hr>` 
            productList.innerHTML=htmlProducts
        })
        res.render('home', {})// le decimos que renderice el archivo index.handlebars(aunque como configuramos 0handlebar) podemos solo poner index
    })
    /*
    tittle
    description
    price
    */

