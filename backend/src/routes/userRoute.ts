import express from "express"
import {getUserProfile} from "../controllers/userController";

const router = express.Router()

router.get("/profile/:username", getUserProfile)

export default router