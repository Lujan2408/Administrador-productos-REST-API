import { Request, Response } from "express"
import Product from "../models/Product.model"

// Siempre que trabajemos con los modelos las funciones deben ser asincronas 

export const createProduct = async (req, res) => {
  
  const product = await Product.create(req.body)
  res.json({data: product })
}