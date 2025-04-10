import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import eventRoutes from "./routes/eventRoutes"

// CONFIGURATIONS

dotenv.config()
const app = express()
app.use(cors())
app.use(json())

// ROUTES
/*
app.use("/", (req, res) => {
    res.send("hello, world!")
})
*/

app.use("/api/events", eventRoutes)

app.get("/", (req, res) => {
  res.send("API is running")
})

// DATABASE CONNECTION

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || ""

mongoose.set("strictQuery", false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Connected at PORT:${PORT}`))
  })
  .catch(err => console.log(`${err}, did not connect!`))
