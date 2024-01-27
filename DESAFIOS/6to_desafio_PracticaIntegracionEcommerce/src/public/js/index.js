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

const nproductId = document.querySelector('#nproductId')
const nproductTitle = document.querySelector('#nproductTitle')
const nproductPrice = document.querySelector('#nproductPrice')
const nproductDescription = document.querySelector('#nproductDescription')
const nproductStock = document.querySelector('#nproductStock')
const nproductCode = document.querySelector('#nproductCode')
const nproductCategory = document.querySelector('#nproductCategory')
const nproductStatus = document.querySelector('#nproductStatus')
const nproductThumbnail = document.querySelector('#nproductThumbnail')
const send = document.querySelector('#send')
const deleteButton = document.querySelector('#delete')

let newUser= {id:nproductId,title:nproductTitle,description: nproductDescription,price: nproductPrice,
    thumbnail: nproductThumbnail,stock: nproductStock,code:nproductCode, status:nproductStatus, category:nproductCategory};

send.addEventListener('click', ()=>{
    socket.emit('addProductMessage', {newUser})
    nproductTitle.value=''
    nproductPrice.value=''
    nproductDescription.value=''
    nproductStock.value=''
    nproductCode.value=''
    nproductId.value=''
    nproductStatus.value=''
    nproductCategory.value=''
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
    nproductStatus.value=''
    nproductCategory.value=''
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
//____________________________________________________________________________________________________________________
//Chat en vivo
let user
Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingresá el usuario para identificarte en el chat',
    inputValidator: value =>{
        return !value && 'Necesitas ingresar el nombre de usuario para continuar..'
    },
    allowOutsideClick: false
}).then( result =>  {
    user=result.value
    console.log(user)
})
const chatbox = document.querySelector('#chatbox')
chatbox.addEventListener('keyup', (evt)=>{
    if(evt.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', { user, message: chatbox.value })
            chatbox.value = ''
        }
    }
})
socket.on('messageLogs', data => {
    // console.log(data)
    let messageLogs = document.querySelector('#messageLogs')
    let mensajes = ''
    data.forEach(mensaje => {
       mensajes += `<li>${mensaje.user} dice: ${mensaje.message}</li>` 
    })
    messageLogs.innerHTML = mensajes
})

// http://localhost:8080
app.get('/', (req,res)=>{
    res.render('index', {} )
})
