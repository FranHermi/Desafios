import { Router } from 'express'
import { messageModel } from '../mongoDB/_dao/models/messages.model.js'
export const messagesRouter = Router()

messagesRouter
    .get('/',async (req, res)=>{
        const messageList=await messageModel.find()
        //console.log(messageList)
        res.send(messageList)
    })
    .get('/:mid', async (req,res)=>{
        const {mid}=req.params
        const mensajeSelecto= await messageModel.find({messageId:mid})
            
        res.send(mensajeSelecto)
    })
    .post('/', async (req,res)=>{
        const {mid, newUser, mess} = req.body
        const newMessage= await messageModel.insertOne({messageId:mid, user: newUser, message:mess})
        newMessage
    })
    .put('/:mid', async (req,res)=>{//Se le pasa el _id del mensaje
        const {mid}=req.params
        let body = req.body
        if(body.messageId){
            const updateMessageId= messageModel.updateOne({_id:mid},{$set:{messageId:body.messageId}})
            updateMessageId
        }else if(body.message){
            const updateMessage= messageModel.updateOne({_id:mid},{$set:{message:body.message}})
            updateMessage
        }else if(body.newUser){
            const updateUser= messageModel.updateOne({_id:mid},{$set:{user:body.newUser}})
            updateUser
        }else{
            console.log('Faltan especificar campos a modificar por el BODY')
            res.send('Faltan especificar campos a modificar por el BODY')
        }
        const mensajeSelecto= await messageModel.find({_id:mid})

        res.send(`Mensaje ${mid} actualizado`)
        res.send(mensajeSelecto)
    })
    .get('/',async (req, res)=>{
        const messageList=await messageModel.find()
        //console.log(messageList)
        res.send(messageList)
    })
    