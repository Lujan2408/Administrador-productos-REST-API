import express from "express";
import colors from "colors"
import router from "./routes"
import db from "./config/db";

// Conectar DB
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.italic.green.bold("Conexión exitosa"))
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold("Error al conectar a la BD"))
  }
}

connectDB()
const server = express()

server.use('/api/products', router)

export default server