import { validationResult } from "express-validator";
import Cliente from "../models/cliente";


export const login = async (req, res) => {
  try {
    // manejar los errores de la validacion
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //verificar si existe un mail como el recibido
    const { email, contrasena } = req.body;

    //verificar si el email ya existe
    let cliente = await Cliente.findOne({ email }); //devulve un null
    if (!cliente) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }
     if (contrasena !== cliente.contrasena) {
        return res.status(400).json({
          mensaje: "Correo o password invalido - password",
        });
      }
    // //verificar si el password corresponde con el pass encriptado en mi BD
    const contrasenaValido = bcrypt.compareSync(contrasena, usuario.contrasena);
    // // si no es valido el password
    if (!contrasenaValido) {
    return res.status(400).json({
    mensaje: "Correo o password invalido - password",
    });
    }
  

    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: cliente._id,
      nombre: cliente.nombre
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};


export const crearCliente= async (req, res) => {
  try {
    // manejar los errores de la validacion
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, contrasena } = req.body;

    //verificar si el email ya existe
    let cliente = await Cliente.findOne({ email }); 
    if (cliente) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "ya existe un cliente con el correo enviado",
      });
    }

    //guardamos el nuevo usuario en la BD
    cliente = new Cliente(req.body);
    // //guardar el usuario en la BD con la pass encriptada
    // const salt = bcrypt.genSaltSync();
    // usuario.password = bcrypt.hashSync(password, salt);

    await cliente.save();

    res.status(201).json({
      mensaje: "cliente creado",
      nombre: cliente.nombre,
      uid: cliente._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};




/*

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


const { email } = req.body;


    let cliente = await Cliente.findOne({ email }); 
    if (cliente) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "ya existe un cliente con el correo enviado",
      });
    }
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
      mensaje: 'Error no se pudo encontrar el cliente'
    })
  }
}
export const editarCliente = async (req, res)=>{
  try{
    //buscar el cliente  por el id, luego modificar los datos con el body
    await Cliente.findByIdAndUpdate(req.params.id,req.body);
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
      mensaje: 'El cliente fue editado correctamente'
    })
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error el cliente solicitado no pudo ser modificado'
    })
  }
}
export const borrarCliente= async (req, res)=>{
  try{
  //buscar un cliente por el id y borrar
  await Cliente.findByIdAndDelete(req.params.id)
  //responder al frontend si pude eliminar el cliente
  res.status(200).json({
    mensaje: 'El cliente fue correctamente eliminado'
  })
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error el cliente solicitado no pudo ser eliminado'
    })
  }
}
*/
