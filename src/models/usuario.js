import mongoose, {Schema} from "mongoose";


//Schema es una clase de Moongose
const usuarioSchema = new Schema({
    nombreUsuario:{
        type: String,
        required:true,
        minLength:2,
        maxLength:50, 
    },
    apellido:{
        type: String,
        required:true,
        minLength:2,
        maxLength:50, 
    },
    mail:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:10
    }
})

// aqui realizamos el modelo
const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;