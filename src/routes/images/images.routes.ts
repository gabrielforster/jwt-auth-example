import { Router } from "express"

import * as ImagesHandler from "./images.handler"
import auth from "../../middleware/auth"

const router = Router()

router.get("/all", auth, ImagesHandler.findAll)

export default router