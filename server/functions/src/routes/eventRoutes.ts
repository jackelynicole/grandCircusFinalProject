import express, { Router } from "express"
import { getEvents, createEvent } from "../controllers/eventController"

const router: Router = express.Router()

router.get("/", getEvents)
router.post("/", createEvent)

export default router
