import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    nombreProducto:{
        type: String,
        required:true,
        unique:true,
        minLength:2,
        maxLength:50, 
    },
    estado:{
        type:String,
        required:true,
    },
    precio:{
        type:Number,
        required:true,  
        min: 1,
        max: 20000
    },
     detalle:{
        type:String,
        required:true,
        minLength:2,
        maxLength:1000 
    },
    categoria:{
        type: String,
        required:true,
    },
    imagen:{
        type: String,
        required:true
    }
      

})

// aqui realizamos el modelo
const Producto = mongoose.model('producto', productoSchema);

export default Producto;