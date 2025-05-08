import { Request, Response } from "express"
import Product from "../models/Product.model"

// Siempre que trabajemos con los modelos las funciones deben ser asincronas 

//Obtener productos
export const getProducts = async (req : Request, res : Response) => {
  try {
    const products = await Product.findAll({
        order: [
          ['price', 'DESC']
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'availability']}
    })
    res.json({data: products})
  } catch (error) {
    console.log(error)
  }
}

// Crear productos
export const createProduct = async (req : Request, res : Response) => {
  try {
    const product = await Product.create(req.body)
    res.json({ data: product })
  } catch (error) {
    console.log(error)
  }
}