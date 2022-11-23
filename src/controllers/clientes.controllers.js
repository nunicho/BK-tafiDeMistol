import { validationResult } from "express-validator";
import Cliente from "../models/cliente";


export const listarClientes = async(req, res) => {
    try {
        //buscar todos los clientes en la BD
        const listaClientes = await Cliente.find();
        //responder al cliente que todo salió bien
        res.status(200).json(listaClientes)
      } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al intentar buscar los clientes'
        })
      }


};

export const crearCliente = async(req, res) => {
  try {
    //manejar los errores de express-validator
    const errores = validationResult(req);
    //errores.isEmpty() retorna true cuando no hay errores, retorna false cuando hay errores
    // pregunto si hay errores
    if(!errores.isEmpty()){
      return res.status(400).json({
        errores: errores.array()
      })
    }

    //extraer del body los datos
    console.log(req.body);
    //agregar la validacion correspondiente
    const clienteNuevo = new Cliente(req.body);
    //guardar ese cliente en la BD
    await clienteNuevo.save();
    //responder al cliente que todo salió bien
    res.status(201).json({
        mensaje: 'El cliente fue correctamente creado'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
        mensaje: 'Error al intentar agregar un cliente'
    })
  }
};


export const obtenerCliente = async (req, res)=>{
  try{
    //obtener el parametro
    console.log(req.params.id)
    //pedirle a la BD buscar el documento que coincide con el id del parametro
    const clienteBuscado = await Cliente.findById(req.params.id);
    //responder con la cliente encontrada
    res.status(200).json(clienteBuscado);
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error no se pudo encontrar el usuario'
    })
  }
}
export const editarUsuario = async (req, res)=>{
  try{
    //buscar la usuario  por el id, luego modificar los datos con el body
    await Usuario.findByIdAndUpdate(req.params.id,req.body);
    const errores = validationResult(req);
    //errores.isEmpty() retorna true cuando no hay errores, retorna false cuando hay errores
    // pregunto si hay errores
    if(!errores.isEmpty()){
      return res.status(400).json({
        errores: errores.array()
      })
    }
     //responder al frontend
    res.status(200).json({
      mensaje: 'El usuario fue editado correctamente'
    })
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error el usuario solicitado no pudo ser modificado'
    })
  }
}
export const borrarUsuario= async (req, res)=>{
  try{
  //buscar una usuario por el id y borrar
  await Usuario.findByIdAndDelete(req.params.id)
  //responder al frontend si pude eliminar el usuario
  res.status(200).json({
    mensaje: 'El usuario fue correctamente eliminado'
  })
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error el usuario solicitado no pudo ser eliminado'
    })
  }
}