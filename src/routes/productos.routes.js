import {Router} from "express"; 
import { obtenerProducto, crearProducto, listarProductos, editarProducto, borrarProducto } from "../controllers/productos.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post([
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 50 caracteres"
        ),
     check('estado')
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 50 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage('El precio debe ser un numero')
        .custom((value)=>{
            if(value>= 1 && value <= 20000){
                return true;
            }else{
                throw new Error('El precio debe estar entre 1 y 20000')
            }
        }),
      check('detalle')
        .notEmpty()
        .withMessage("El detalle es un dato obligatorio")
        .isLength({ min: 2, max: 1000 })
        .withMessage(
          "El detalle debe tener entre 2 y 1000 caracteres"
        ),
      check('categoria')
        .notEmpty()
        .withMessage("Los categoria es un dato obligatorio")
        .isIn(['Entrada','Plato principal','Postre','Bebida','Aperitivo'])
        .withMessage('La categoría elegida debe ser correcta'
        ),
     check('imagen')
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage('Debe enviar una URL valida'
        ),
    ],
    crearProducto);

router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put([
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 50 caracteres"
        ),
     check('estado')
        .notEmpty()
        .withMessage("El estado es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 50 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage('El precio debe ser un numero')
        .custom((value)=>{
            if(value>= 1 && value <= 20000){
                return true;
            }else{
                throw new Error('El precio debe estar entre 1 y 20000')
            }
        }),
      check('detalle')
        .notEmpty()
        .withMessage("El detalle es un dato obligatorio")
        .isLength({ min: 2, max: 1000 })
        .withMessage(
          "El detalle debe tener entre 2 y 1000 caracteres"
        ),
      check('categoria')
        .notEmpty()
        .withMessage("Los categoria es un dato obligatorio")
        .isIn(['Entrada','Plato principal','Postre','Bebida','Aperitivo'])
        .withMessage('La categoría elegida debe ser correcta'
        ),
     check('imagen')
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage('Debe enviar una URL valida'
        ),
    ],
    editarProducto)
  .delete(borrarProducto);

  export default router;
