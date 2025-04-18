import express, { Router } from "express"
import { getEvents } from "../controllers/eventController"

const router: Router = express.Router()

router.get("/", getEvents)

export default router
