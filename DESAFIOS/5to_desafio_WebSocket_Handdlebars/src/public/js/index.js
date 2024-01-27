//npm run start

const socket = io()//config para usar socket del lado cliente

import express from 'express'
import appRouter from './routes/index.js'
import { engine } from 'express-handlebars'
import { socket } from 'socket.io' 

const app = express()

app.use(appRouter)

app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

const port = 8080 || process.env.port
app.listen(port, ()=>{
    console.log('Escuchando en el puerto 8080')
})

const nproductTitle = document.querySelector('#nproductTitle')
const nproductPrice = document.querySelector('#nproductPrice')
const nproductDescription = document.querySelector('#nproductDescription')
const nproductStock = document.querySelector('#nproductStock')
const nproductCode = document.querySelector('#nproductCode')
const nproductId = document.querySelector('#nproductId')
const nproductThumbnail = document.querySelector('#nproductThumbnail')
const send = document.querySelector('#send')
const deleteButton = document.querySelector('#delete')

let newUser= {id:nproductId,title:nproductTitle,description: nproductDescription,price: nproductPrice,
    thumbnail: nproductThumbnail,stock: nproductStock,code:nproductCode};

send.addEventListener('click', ()=>{
    socket.emit('addProductMessage', {newUser})
    nproductTitle.value=''
    nproductPrice.value=''
    nproductDescription.value=''
    nproductStock.value=''
    nproductCode.value=''
    nproductId.value=''
    nproductThumbnail.value=''
})

deleteButton.addEventListener('click', ()=>{
    socket.emit('deleteMessage', nproductId)
    nproductTitle.value=''
    nproductPrice.value=''
    nproductDescription.value=''
    nproductStock.value=''
    nproductCode.value=''
    nproductId.value=''
    nproductThumbnail.value=''
})

socket.on('addedProduct', data=>{
    Swal.fire({
        title: data,
        icon: 'succes',
        allowOutsideClick: true
    })
})

socket.on('deletedProduct', data=>{
    Swal.fire({
        title: data,
        icon: 'succes',
        allowOutsideClick: true
    })
})

// http://localhost:8080
app.get('/', (req,res)=>{
    res.render('index', {} )
})
