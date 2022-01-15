
import express from "express"
import authControler from "../controllers/auth.js"
import validator from "../middlewares/validator.js"
import multer from "multer"

let imageMulter = multer()
const router = express.Router()


router.post("/login",authControler.LOGIN)
router.post("/register",imageMulter.single("file"),validator.registerValidator,authControler.REGISTER)

export default router