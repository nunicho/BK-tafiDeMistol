import { Router } from "express";
import {
  obtenerCliente,
  crearCliente,
  listarClientes,
  editarCliente,
  borrarCliente,
} from "../controllers/clientes.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/clientes")
  .get(listarClientes)
  .post(
    [
      check("nombreCliente")
        .notEmpty()
        .withMessage("El nombre del cliente es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del cliente debe tener entre 2 y 50 caracteres"
        ),
      check("apellido")
        .notEmpty()
        .withMessage("El apellido es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido de tener entre 2 y 50 caracteres"),
      check("email")
        .notEmpty()
        .withMessage("El mail es un dato obligatorio")
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        .withMessage("Debe enviar un mail válido"),
      check("contrasena")
        .notEmpty()
        .withMessage("El password es un dato obligatorio")
        .isLength({ min: 8 })
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
        .withMessage(
          "La contraseña debe como minimo 8 caracteres y al menos una letra, un número y un símbolo especial"
        ),
      check("estado")
        .notEmpty()
        .withMessage("El Estado es un dato obligatorio")
        .isIn(["Familiar", "Institucional"])
        .withMessage("El estado elegido debe ser correcto"),

      check("perfil")
        .notEmpty()
        .withMessage("El Perfil es un dato obligatorio")
        .isIn(["Sin restricciones", "Celíaco, vegano, etc"])
        .withMessage("El perfil elegido debe ser correcto"),
    ],
    crearCliente
  );

router
  .route("/clientes/:id")
  .get(obtenerCliente)
  .put(
    [
      check("nombreCliente")
        .notEmpty()
        .withMessage("El nombre del cliente es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del cliente debe tener entre 2 y 50 caracteres"
        ),
      check("apellido")
        .notEmpty()
        .withMessage("El apellido es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido de tener entre 2 y 50 caracteres"),
      check("email")
        .notEmpty()
        .withMessage("El mail es un dato obligatorio")
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        .withMessage("Debe enviar un mail válido"),
      check("contrasena")
        .notEmpty()
        .withMessage("El password es un dato obligatorio")
        .isLength({ min: 8 })
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
        .withMessage(
          "La contraseña debe como minimo 8 caracteres y al menos una letra, un número y un símbolo especial"
        ),
      check("estado")
        .notEmpty()
        .withMessage("El Estado es un dato obligatorio")
        .isIn(["Familiar", "Institucional"])
        .withMessage("El estado elegido debe ser correcto"),

      check("perfil")
        .notEmpty()
        .withMessage("El Perfil es un dato obligatorio")
        .isIn(["Sin restricciones", "Celíaco, vegano, etc"])
        .withMessage("El perfil elegido debe ser correcto"),
    ],
    editarCliente
  )
  .delete(borrarCliente);

export default router;
