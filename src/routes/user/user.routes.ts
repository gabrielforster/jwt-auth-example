import { Router } from "express"

import * as UserHandler from "./user.handler"

const router = Router()

router.post("/register", UserHandler.registerUser)
router.post("/login", UserHandler.loginUser)

export default router