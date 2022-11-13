import { validationResult } from "express-validator";
import Producto from "../models/producto";


export const listarProductos = async(req, res) => {
    try {
        const listaProductos = await Producto.find();
        res.status(200).json(listaProductos)
      } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al intentar buscar el producto'
        })
      }


};

export const crearProducto= async(req, res) => {
  try {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.status(400).json({
        errores: errores.array()
      })
    }
    console.log(req.body);
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    res.status(201).json({
        mensaje: 'El producto fue correctamente creado'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
        mensaje: 'Error al intentar agregar un producto'
    })
  }
};


export const obtenerProducto = async (req, res)=>{
  try{
    console.log(req.params.id)
    const productoBuscado = await Producto.findById(req.params.id);
    res.status(200).json(productoBuscado);
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error no se pudo encontrar el producto'
    })
  }
}
export const editarProducto = async (req, res)=>{
  try{
    await Producto.findByIdAndUpdate(req.params.id,req.body);
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.status(400).json({
        errores: errores.array()
      })
    }
    res.status(200).json({
      mensaje: 'El producto fue editado correctamente'
    })
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error, el producto solicitado no pudo ser modificado'
    })
  }
}
export const borrarProducto = async (req, res)=>{
  try{
   await Producto.findByIdAndDelete(req.params.id)
   res.status(200).json({
    mensaje: 'El producto fue correctamente eliminado'
  })
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error, el producuto solicitado no pudo ser eliminado'
    })
  }
}