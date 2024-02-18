import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import {cartModel} from './carts.models.js'

const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
     },
    last_name: {
        type: String,
        required: true,
        index: true
     },
    age:{
        type: Number,
        required: true
     },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
     },
     rol: {
        type: String,
        enum: ['user', 'admin', 'premium'],
        default: 'user'
    },
     cart: {
        type: Schema.Types.ObjectId, ref: 'carts'
     },
     isPremium: {
        type: Boolean,
        default: false
    },
    documents: [
        {
            name: { type: String, required: true },
            reference: { type: String, required: true }
        }
    ],

    last_connection: { type: Date, default: null }
})


userSchema.plugin(mongoosePaginate);

userSchema.pre('save', async function(next){
    try {
        const newCart = await cartModel.create({})
        this.cart = newCart._id
    }catch(error) {
        next(error)
    }

})

export const userModel = model('users', userSchema)
