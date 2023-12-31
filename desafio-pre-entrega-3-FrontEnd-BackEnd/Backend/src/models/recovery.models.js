import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const recoverySchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    },
});

recoverySchema.plugin(mongoosePaginate);

export default model("Recovery", recoverySchema);