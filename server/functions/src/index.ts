import express from "express"
import { onRequest } from "firebase-functions/v2/https"
import cors from "cors"
import eventRoutes from "./routes/eventRoutes"
//import shoutoutsRouter from "./routes/shoutoutsRouter"
import secretsRouter from "./routes/secretsRouter"
import establishConnection from "./middleware/establishConnection"
import checkAuth from "./middleware/auth"
const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(establishConnection)
//app.use("/shoutouts", shoutoutsRouter)
app.use("/secret", checkAuth, secretsRouter)

app.use("/events", eventRoutes)
app.get("/", (req, res) => {
  res.send("API is running")
})

export const api = onRequest(app)
