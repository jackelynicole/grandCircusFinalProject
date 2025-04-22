import express from "express"
import { onRequest } from "firebase-functions/v2/https"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import eventRoutes from "./routes/eventRoutes"
import secretsRouter from "./routes/secretsRouter"
import establishConnection from "./middleware/establishConnection"
import checkAuth from "./middleware/auth"

// CONFIGURATIONS
dotenv.config()
const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(establishConnection)

// ROUTES
app.use("/secret", checkAuth, secretsRouter)
app.use("/events", eventRoutes)
app.get("/", (req, res) => {
  res.send("API is running")
})

// DATABASE CONNECTION (from J's code)
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || ""
mongoose.set("strictQuery", false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB")
    // Only listen on port when not in Firebase environment
    if (process.env.FIREBASE_CONFIG === undefined) {
      app.listen(PORT, () => console.log(`Connected at PORT:${PORT}`))
    }
  })
  .catch(err => console.log(`${err}, did not connect!`))

// Export for Firebase Functions
export const api = onRequest(app)

/*
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

// server/src/index.ts
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
*/
