import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

// Routing 
router.get('/', getProducts)

router.get('/:productId', 
  param('productId').isInt().withMessage('ID no válido'),
  handleInputErrors, 
  getProductById
)

router.post("/",

  // Validación
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede estar vacío"),
  body("price")
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage("El precio del producto no puede estar vacío")
    .custom((value) => value > 0).withMessage("Precio no válido"), // Validaciones personalizadas 
  
  handleInputErrors,
  createProduct
)

router.put('/:productId', 
 
  param('productId').isInt().withMessage('ID no válido'),
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede estar vacío"),
  body("price")
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage("El precio del producto no puede estar vacío")
    .custom((value) => value > 0).withMessage("Precio no válido"), // Validaciones personalizadas 
  body('availability')
    .isBoolean().withMessage('Valor no válido para la disponibilidad'),
  handleInputErrors,
  updateProduct
)

router.patch('/:productId',
  param('productId').isInt().withMessage('ID no válido'),
  handleInputErrors,
  updateAvailability
)

router.delete('/:productId', 
  param('productId').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
)

export default router