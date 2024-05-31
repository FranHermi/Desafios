import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const UserSchema = Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String, 
    cartId:{
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },  
    role: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    },
    documents: [
        {
          name: String,
          reference: String,
        }
    ],    
    last_connection: {
        type: Date,
        default: Date.now,
    },    
    isPremium: {
        type: Boolean,
        default: false,
    }
})


UserSchema.pre('findOne', function() {
    this.populate('cartId')
})

UserSchema.plugin(mongoosePaginate)

export let userModel = model(userCollection, UserSchema)
