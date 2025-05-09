import { Router } from "express"
import { createProduct, getProductById, getProducts, updateProduct } from "./handlers/product"
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

router.patch('/', (req, res) => {
  res.json("Desde patch")
})

router.delete('/', (req, res) => {
  res.json("Desde DELETE")
})

export default router