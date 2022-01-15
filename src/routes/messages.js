
import express from "express"
import mesControler from "../controllers/messages.js"
import analizToken from "../middlewares/analizToken.js"

import multer from "multer"

let messageMulter = multer()


const router = express.Router()

router.get("/",analizToken,mesControler.GET)
router.post("/",analizToken,messageMulter.single("messages"),mesControler.POST)

export default router