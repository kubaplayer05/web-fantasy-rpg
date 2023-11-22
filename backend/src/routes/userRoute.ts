import express from "express"
import {getUserProfile} from "../controllers/userController";
import {getAllUserWeapons} from "../controllers/weaponController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router()

router.get("/profile/:username", getUserProfile)
router.use(authMiddleware)
router.get("/weapons", getAllUserWeapons)

export default router