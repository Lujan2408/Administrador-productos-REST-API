import express from "express";
import router from "./routes"
import db from "./config/db";

// Conectar DB
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log("Conexión exitosa")
  } catch (error) {
    console.log(error)
    console.log("Error al conectar a la BD")
  }
}

connectDB()
const server = express()

server.use('/api/products', router)

export default server