import {Router} from "express"; 
import { obtenerUsuario, crearUsuario, listarUsuarios, editarUsuario, borrarUsuario } from "../controllers/usuarios.controllers";
import { check } from "express-validator";

//ojo, Router no es lo mismo que router.
const router = Router();

router
  .route("/usuarios")
  .get(listarUsuarios)
  .post([
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre del usuario es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre del usuario debe tener entre 2 y 50 caracteres"
        ),
     check('apellido')
        .notEmpty()
        .withMessage("El apellido es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido de tener entre 2 y 50 caracteres"
        ),
     check('email')
        .notEmpty()
        .withMessage("El mail es un dato obligatorio")
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Debe enviar un mail válido'
        ),
      check('contrasena')
        .notEmpty()
        .withMessage("El password es un dato obligatorio")
        .isLength({ min: 8 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .withMessage(
          "La contraseña debe como minimo 8 caracteres y al menos una letra, un número y un símbolo especial"
        ),
        check('estado')
        .notEmpty()
        .withMessage("El Estado es un dato obligatorio")
        .isIn(['Activo', 'Inactivo'])
        .withMessage('El estado elegido debe ser correcto'
        ),

        check('perfil')
        .notEmpty()
        .withMessage("El Perfil es un dato obligatorio")
        .isIn(['Cliente', 'Administrador'])
        .withMessage('El perfil elegido debe ser correcto'
        ),
    ],
    crearUsuario);


router
  .route("/usuarios/:id")
  .get(obtenerUsuario)
  .put([
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre del usuario es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre del usuario debe tener entre 2 y 50 caracteres"
        ),
     check('apellido')
        .notEmpty()
        .withMessage("El apellido es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido de tener entre 2 y 50 caracteres"
        ),
     check('email')
        .notEmpty()
        .withMessage("El mail es un dato obligatorio")
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Debe enviar un mail válido'
        ),
      check('contrasena')
        .notEmpty()
        .withMessage("El password es un dato obligatorio")
        .isLength({ min: 8 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .withMessage(
          "La contraseña debe como minimo 8 caracteres y al menos una letra, un número y un símbolo especial"
        ),
        check('estado')
        .notEmpty()
        .withMessage("El Estado es un dato obligatorio")
        .isIn(['Activo', 'Inactivo'])
        .withMessage('El estado elegido debe ser correcto'
        ),

        check('perfil')
        .notEmpty()
        .withMessage("El Perfil es un dato obligatorio")
        .isIn(['Cliente', 'Administrador'])
        .withMessage('El perfil elegido debe ser correcto'
        ),
    ],
    editarUsuario)
  .delete(borrarUsuario);

export default router;