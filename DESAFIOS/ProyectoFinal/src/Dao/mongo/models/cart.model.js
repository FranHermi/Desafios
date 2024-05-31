import { Schema, model } from 'mongoose'

const collection = 'carts'

const CartSchema = new Schema({
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number
            }            
        }]
    } 
})

CartSchema.pre('findOne', function(){
    this.populate('products.product')
})

export const cartModel = model(collection, CartSchema)

