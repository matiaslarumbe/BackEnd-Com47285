import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { faker } from "@faker-js/faker";


const fakerProductsSchema = new Schema({
    title:{
        type: String,
        required: true
     },
    description:{
        type: String,
        required: true
     },
    price:{
        type: Number,
        required: true
     },
    stock:{
        type: Number,
        required: true
     },
     category:{
        type: String,
        required: true,
        index: true
     },
     status:{
        type: Boolean,
        default: true
     },
     code:{
        type: String,
        required: true,
        unique: true
     },
     rol:{
        type: String,
        default: 'user'

     },
     thumbnails: [],

});

fakerProductsSchema.plugin(mongoosePaginate);

export const fakerProductsModel = model("fakerProducts", fakerProductsSchema);