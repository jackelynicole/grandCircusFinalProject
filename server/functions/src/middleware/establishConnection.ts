import type { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()

let isConnected = false

export const connectToDatabase = async (): Promise<void> => {
  if (isConnected || mongoose.connection.readyState === 1) return

  await mongoose.connect(process.env.MONGO_URI ?? "")
  isConnected = true
  console.log("MongoDB connected")
}

const establishConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await connectToDatabase()
    next()
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" })
  }
}
export default establishConnection
