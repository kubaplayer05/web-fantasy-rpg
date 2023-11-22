import express from "express"
import {loginHandler, registerHandler, createAdmin, loginAdmin} from "../controllers/authController";

const router = express.Router()

router.post("/login", loginHandler)

router.get("/create-admin", createAdmin)

router.post("/register", registerHandler)

router.post("/login/admin", loginAdmin)

export default router