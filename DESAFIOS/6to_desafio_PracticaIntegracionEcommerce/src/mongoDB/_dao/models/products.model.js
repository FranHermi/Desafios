import mongoose from 'mongoose'

const productsCollection = 'products'
const productsSchema = new mongoose.Schema({
    productId: Number,
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    stock: Number,
    status: String,
    category: String,
    code: {
        type: String,
        required: true
    },
    thumbnail: Object,
    isActive: {
        type: Boolean,
        default: true
    }
})

export const productsModel = mongoose.model(productsCollection, productsSchema)
