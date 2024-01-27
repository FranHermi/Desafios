//import {ProductManager} from'../mongoDB/_dao/Dao/managers/productManager.js'
import { Router } from 'express'
import { productsModel } from '../mongoDB/_dao/models/products.model.js'
//const products = new ProductManager()
export const productsRouter = Router()

productsRouter
    .get('/', async (req, res)=>{
        //let productList = await products.readFileProducts()
        const productsList=await productsModel.find().pretty()
        console.log(productsList)
        res.send(productsList)
    })
    .get('/', async (req, res)=>{
        const limit = req.query.parseInt(limit);
        if(limit){
            // let productList = await products.readFileProducts()
            // const limitedProducts = productList.slice(0, limit)
            // res.send(limitedProducts)
            const limitedProducts = await productsModel.find().limit(limit).pretty()
            res.send(limitedProducts)
        }
    })
    //http://localhost:8080/api/products/:id
    .get('/:pid', async (req,res)=>{
        // const productList =  await products.readFileProducts()
        // const {pid}=req.params
        // productoSelecto = productList.filter(prod=>prod.id!==parseInt(pid))
        const {pid}=req.params
        const productoSelecto= await productsModel.find({productId:pid})
            
        res.send(productoSelecto)
    })
    .post('/:ptitle/:pdescription/:pcode/:pprice/:pstatus/:pstock/:pcategory/:pthumbnails', async (req, res)=>{
        //await products.readFileProducts()
        const {ptitle, pdescription, pcode, pprice, pstatus, pstock, pcategory, pthumbnails}=req.params
        //products.addProducts({title:ptitle, description: pdescription, code:pcode, price: pprice,status: pstatus, stock: pstock, category: pcategory, thumbnail: pthumbnails})
        const productsList = await productsModel.find()
        const thisId= productsList.length+1
        const addProducto= await productsModel.insertOne({productId:thisId,title:ptitle,description:pdescription,price:pprice,stock:pstock,category:pcategory,
                                                          code:pcode,status:pstatus,thumbnail:pthumbnails})
        addProducto

        res.send(`Producto ${ptitle} con ID ${thisId} creado`)
    })
    .put('/:pid', async (req,res)=>{
        //await products.readFileProducts()
        const { pid }=req.params
        let body = req.body
        //products.updateProduct(pid, body.campo, body.update)
        //updateProduct(pid, campo, update)
        if(body.productId){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{productId:body.productId}})
            productUpd
        } else if(body.title){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{title:body.title}})
            productUpd
        } else if(body.description){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{description:body.description}})
            productUpd
        } else if(body.price){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{price:body.price}})
            productUpd
        } else if(body.stock){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{stock:body.stock}})
            productUpd
        } else if(body.status){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{status:body.status}})
            productUpd
        } else if(body.category){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{category:body.category}})
            productUpd
        } else if(body.code){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{description:body.description}})
            productUpd
        } else if(body.thumbnail){
            const productUpd= productsModel.updateOne({_id:pid},{$set:{thumbnail:body.thumbnail}})
            productUpd
        } else{
            //console.log('Faltan ingresar campos a modificar en el Body')
            res.send('Faltan ingresar campos a modificar en el Body')
        }

        res.send(`Producto ${pid} actualizado`)
    })
    .delete('/:pid', async (req,res)=>{
        // await products.readFileProducts()
        // const { pid }=req.params
        // deleteProduct(pid)
        //deleteProduct(pid)
        const { pid }=req.params
        const productUpd= productsModel.updateOne({productId:pid},{$set:{isActive:false}})
        productUpd
        //console.log(`Producto con ID:${pid} eliminado`)

        res.send(`Producto con ID:${pid} eliminado`)
    })
    .get('/realTimeProducts', (req,res)=>{
        res.render('realtimeproducts', {})// le decimos que renderice el archivo index.handlebars(aunque como configuramos 0handlebar) podemos solo poner index
    })
    .get('/productList', async (req,res)=>{
        let productList = document.querySelector('#productList')
        //let thisProductos = await products.readFileProducts()
        let thisProductos= await productsModel.find()
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

