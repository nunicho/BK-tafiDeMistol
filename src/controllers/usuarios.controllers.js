import { validationResult } from "express-validator";
import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await Usuario.find();
    res.status(200).json(listaUsuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al intentar buscar los usuarios",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }

    const { email, contrasena } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    const usuarioNuevo = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuarioNuevo.contrasena = bcrypt.hashSync(contrasena, salt);

    await usuarioNuevo.save();
    res.status(201).json({
      mensaje: "El usuario fue correctamente creado",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al intentar agregar una usuario",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    console.log(req.params.id);
    const usuarioBuscado = await Usuario.findById(req.params.id);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo encontrar el usuario",
    });
  }
};
export const editarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
    res.status(200).json({
      mensaje: "El usuario fue editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el usuario solicitado no pudo ser modificado",
    });
  }
};
export const borrarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El usuario fue correctamente eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error el usuario solicitado no pudo ser eliminado",
    });
  }
};
