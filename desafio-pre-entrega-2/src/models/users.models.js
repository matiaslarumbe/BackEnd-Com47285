import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const userSchema = new Schema({
    nombre:{
        type: String,
        required: true
     },
    apellido: {
        type: String,
        required: true,
        index: true
     },
    edad:{
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
     }
})


userSchema.plugin(mongoosePaginate);

  


export const userModel = model('users', userSchema)