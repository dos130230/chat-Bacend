
import express from "express"
import userControler from "../controllers/users.js"


const router = express.Router()


router.get("/",userControler.GET)
router.get("/frendUser",userControler.GET)

export default router