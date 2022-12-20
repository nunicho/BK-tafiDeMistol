import mongoose, { Schema } from "mongoose";

const clienteSchema = new Schema({
  nombreCliente: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  apellido: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    // required:true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
    minLength: 8,
  },
  estado: {
    type: String,
    required: true,
  },

  perfil: {
    type: String,
    required: true,
  },
});

const Cliente = mongoose.model("cliente", clienteSchema);

export default Cliente;
