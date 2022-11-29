import mongoose, {Schema} from "mongoose";


//Schema es una clase de Moongose
const clienteSchema = new Schema({
    nombreCliente:{
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
    email:{
        type:String,
        required:true
    },
    contrasena:{
        type:String,
        required:true,
        minLength:8,
    },
    estado:{
        type:String,
        required:true
    },

    perfil:{
        type:String,
        required:true
    }
})

// aqui realizamos el modelo
const Cliente = mongoose.model('cliente', clienteSchema);

export default Cliente;