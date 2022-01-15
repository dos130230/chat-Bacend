
import express from "express"
import userControler from "../controllers/users.js"
import analizToken from "../middlewares/analizToken.js"


const router = express.Router()


router.get("/",analizToken,userControler.GET)
router.get("/frendUser",analizToken,userControler.GET)

export default router