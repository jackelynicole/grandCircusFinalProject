import { Router } from "express"
import {
	getShoutouts,
	getShoutout,
	postShoutout,
	putShoutout,
	deleteShoutout
} from "../controllers/shoutouts"

const routes = Router()

routes.post("/", postShoutout)
routes.get("/", getShoutouts)
routes.get("/:id", getShoutout)
routes.put("/:id", putShoutout)
routes.delete("/:id", deleteShoutout)

export default routes
