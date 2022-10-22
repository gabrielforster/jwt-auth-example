import express from "express"

import { connect } from "./src/config/database"

import userRoutes from "./src/routes/user/user.routes"
import imagesRoutes from "./src/routes/images/images.routes"

require('dotenv').config();

connect()
const app = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/images", imagesRoutes)

export default app