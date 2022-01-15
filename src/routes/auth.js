
import express from "express"
import authControler from "../controllers/auth.js"


const router = express.Router()


router.get("/login",authControler.LOGIN)

export default router