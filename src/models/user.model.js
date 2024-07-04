import mongoose from "mongoose";
import { type } from '../../node_modules/mongodb/src/write_concern';

const userSchema = mongoose.Schema({

    user:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,     
    },

});

export default mongoose.model('User', userSchema);