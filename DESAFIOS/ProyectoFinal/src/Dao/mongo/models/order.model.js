import {Schema, model} from 'mongoose'

const orderCollection = 'orders'

const orderSchema = new Schema({  
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'productos'
    }],
    totalprice: Number,
    created: Date
    

})

export const OrderModel = model(orderCollection, orderSchema)
