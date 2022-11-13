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
     check('mail')
        .notEmpty()
        .withMessage("El mail es un dato obligatorio")
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Debe enviar un mail válido'
        ),
      check('password')
        .notEmpty()
        .withMessage("El password es un dato obligatorio")
        .isLength({ min: 8 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .withMessage(
          "La contraseña debe como minimo 8 caracteres y al menos una letra, un número y un símbolo especial"
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
        .isLength({ min: 8, max: 50 })
        .withMessage("El apellido de tener entre 2 y 50 caracteres"
        ),
     check('mail')
        .notEmpty()
        .withMessage("El mail es un dato obligatorio")
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Debe enviar un mail válido'
        ),
      check('password')
        .notEmpty()
        .withMessage("El password es un dato obligatorio")
        .isLength({ min: 8 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .withMessage(
          "La contraseña debe como minimo 8 caracteres y al menos una letra, un número y un símbolo especial"
        ),
    ],
    editarUsuario)
  .delete(borrarUsuario);

export default router;