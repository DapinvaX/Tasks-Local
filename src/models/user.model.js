import mongoose from "mongoose";





// Definimos el esquema de usuario para la base de datos de MongoDB con los campos user, email y password del usuario.
//Instanciamos con el "new" un nuevo esquema de mongoose con los campos user, email y password
const userSchema = new mongoose.Schema({

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