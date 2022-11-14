import mongoose, {Schema} from "mongoose";

const pedidoSchema = new Schema({
    detallePedido:{
        type: String,
        required:true,
        minLength:2,
        maxLength:500, 
    },
    estado:{
        type:String,
        required:true,
    },
    costoTotal:{
        type:Number,
        required:true,
        min: 1,
        max: 500000,
    }  

})

// aqui realizamos el modelo
const Pedido = mongoose.model('pedido', pedidoSchema);

export default Pedido;