
import express from "express"
import mesControler from "../controllers/messages.js"


const router = express.Router()


router.get("/",mesControler.GET)

export default router