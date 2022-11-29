import {Router} from "express"; 
import { obtenerPedido, crearPedido, listarPedidos, editarPedido, borrarPedido } from "../controllers/pedidos.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/pedidos")
  .get(listarPedidos)
  .post([
      check("detallePedido")
        .notEmpty()
        .withMessage("El detalle del pedido es un dato obligatorio")
        .isLength({ min: 2, max: 5000 })
        .withMessage(
          "El detalle del pedido debe tener entre 2 y 500 caracteres"
        ),
     check('estado')
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isIn(['Pendiente', 'Entregado', 'Cancelado'])
        .withMessage(
          "El estado debe ser correcto"
        ),
      check("costoTotal")
        .notEmpty()
        .withMessage("El costo total es un dato obligatorio")
        .isNumeric()
        .withMessage('El costo total debe ser un numero')
        .custom((value)=>{
            if(value>= 1 && value <= 500000){
                return true;
            }else{
                throw new Error('El costo total debe estar entre 1 y 500000')
            }
        }),
      ],
    crearPedido);

router
  .route("/pedidos/:id")
  .get(obtenerPedido)
  .put([
      check("detallePedido")
        .notEmpty()
        .withMessage("El detalle del pedido es un dato obligatorio")
        .isLength({ min: 2, max: 5000 })
        .withMessage(
          "El detalle del pedido debe tener entre 2 y 500 caracteres"
        ),
     check('estado')
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isIn(['Pendiente', 'Entregado', 'Cancelado'])
        .withMessage(
          "El estado debe ser correcto"
        ),
      check("costoTotal")
        .notEmpty()
        .withMessage("El costo total es un dato obligatorio")
        .isNumeric()
        .withMessage('El costo total debe ser un numero')
        .custom((value)=>{
            if(value>= 1 && value <= 500000){
                return true;
            }else{
                throw new Error('El costo total debe estar entre 1 y 500000')
            }
        }),
      ],
    editarPedido)
  .delete(borrarPedido);

  export default router;
