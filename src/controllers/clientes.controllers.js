import { validationResult } from "express-validator";
import Cliente from "../models/cliente";
import bcrypt from "bcryptjs";

export const listarClientes = async (req, res) => {
  try {
    const listaClientes = await Cliente.find();
    res.status(200).json(listaClientes);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los clientes",
    });
  };
};

export const crearCliente = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    };

    const { email, contrasena } = req.body;

    let cliente = await Cliente.findOne({ email });
    if (cliente) {
      return res.status(400).json({
        mensaje: "ya existe un cliente con el correo enviado",
      });
    };
    const clienteNuevo = new Cliente(req.body);
    const salt = bcrypt.genSaltSync();
    clienteNuevo.contrasena = bcrypt.hashSync(contrasena, salt);

    await clienteNuevo.save();
    res.status(201).json({
      mensaje: "El cliente fue correctamente creado",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al intentar agregar un cliente",
    });
  };
};

export const obtenerCliente = async (req, res) => {
  try {
    console.log(req.params.id);
    const clienteBuscado = await Cliente.findById(req.params.id);
    res.status(200).json(clienteBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo encontrar el cliente",
    });
  };
};
export const editarCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndUpdate(req.params.id, req.body);
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
    res.status(200).json({
      mensaje: "El cliente fue editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el cliente solicitado no pudo ser modificado",
    });
  }
};
export const borrarCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El cliente fue correctamente eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el cliente solicitado no pudo ser eliminado",
    });
  };
};
