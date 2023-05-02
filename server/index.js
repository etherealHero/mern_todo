import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import * as dotenv from "dotenv"
dotenv.config()

import AuthRouter from "./auth/auth.router.js"
import CategoryRouter from "./category/category.router.js"
import TaskRouter from "./task/task.router.js"

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL || ""

app.use("/api/auth", AuthRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/task", TaskRouter)

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(5000, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
