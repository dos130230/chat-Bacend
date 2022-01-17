import express from "express"
import downloadControler from "../controllers/download.js"

const router = express.Router()


router.get("/others/:fileName",downloadControler.GET)

export default router