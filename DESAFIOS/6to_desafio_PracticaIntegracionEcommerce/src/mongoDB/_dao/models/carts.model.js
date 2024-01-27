import mongoose from 'mongoose'

const cartsCollection = 'carts'
const cartsSchema = new mongoose.Schema({
    cartId: Number,
    products: [],
    isActive: {
        type: Boolean,
        default: true
    }
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)
