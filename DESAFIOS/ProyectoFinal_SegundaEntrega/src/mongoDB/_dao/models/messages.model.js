import mongoose from 'mongoose'

const messagesCollection = 'messages'
const messagesSchema = new mongoose.Schema({
    messageId: Number,
    user: {//correo del usuario
        type: String,
        required: true,
        unique: true
    },
    message: String,
    isActive: {
        type: Boolean,
        default: true
    }
})

export const messageModel = mongoose.model(messagesCollection, messagesSchema)