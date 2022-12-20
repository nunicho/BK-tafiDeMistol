import { validationResult } from "express-validator";
import Pedido from "../models/pedido";

export const listarPedidos = async (req, res) => {
  try {
    const listaPedidos = await Pedido.find();
    res.status(200).json(listaPedidos);
  } catch (error) {
    res.status(404).json({
      mensaje: "Error al intentar buscar el pedido",
    });
  }
};

export const crearPedido = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
    const pedidoNuevo = new Pedido(req.body);
    await pedidoNuevo.save();
    res.status(201).json({
      mensaje: "El pedido fue correctamente creado",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al intentar agregar un pedido",
    });
  }
};

export const obtenerPedido = async (req, res) => {
  try {
    const pedidoBuscado = await Pedido.findById(req.params.id);
    res.status(200).json(pedidoBuscado);
  } catch (error) {
    res.status(404).json({
      mensaje: "Error no se pudo encontrar el pedido",
    });
  }
};
export const editarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndUpdate(req.params.id, req.body);
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }
    res.status(200).json({
      mensaje: "El pedido fue editado correctamente",
    });
  } catch (error) {
    res.status(404).json({
      mensaje: "Error, el pedido solicitado no pudo ser modificado",
    });
  }
};
export const borrarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El pedido fue correctamente eliminado",
    });
  } catch (error) {
    res.status(404).json({
      mensaje: "Error, el producuto solicitado no pudo ser eliminado",
    });
  }
};
