import { Router } from "express"
import { getSecret } from "../controllers/secrets"

const routes = Router()

routes.get("/", getSecret)

export default routes
