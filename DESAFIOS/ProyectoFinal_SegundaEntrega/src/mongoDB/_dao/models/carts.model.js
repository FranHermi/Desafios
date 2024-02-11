import {Schema, model} from 'mongoose'
import {paginate} from 'mongoose-paginate-v2'

const cartsCollection = 'carts'
const cartsSchema = new Schema({
    cartId: Number,
    products: {
        type:[{
            product:{
                type: Schema.Types.ObjectId,
                ref:'products',
                cantidad: Number
            }
        }]
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
cartsSchema.pre('find', function(){
    this.populate('products.product')
})
cartsSchema.pre('updateOne', function(){
    this.populate('products.product')
})

export const cartsModel = model(cartsCollection, cartsSchema)
