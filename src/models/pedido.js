import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  detallePedido: {
    type: Array,
    required: true,
    minLength: 2,
    maxLength: 5000,
  },
  estado: {
    type: String,
    required: true,
  },
  costoTotal: {
    type: Number,
    required: true,
    min: 1,
    max: 500000,
  },
  nombreClientePedido: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
});

const Pedido = mongoose.model("pedido", pedidoSchema);

export default Pedido;
