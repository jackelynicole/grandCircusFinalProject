import express from "express"
import { onRequest } from "firebase-functions/v2/https"
import cors from "cors"
import dotenv from "dotenv"
import eventRoutes from "./routes/eventRoutes"
import establishConnection from "./middleware/establishConnection"

// CONFIGURATIONS
dotenv.config()
const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(establishConnection)

// ROUTES
// app.use("/secret", checkAuth, secretsRouter)
app.use("/events", eventRoutes)
app.get("/", (req, res) => {
  res.send("API is running")
})

export const api = onRequest(app)
