import express from "express"
import {getAllClass} from "../controllers/userClassControler";

const router = express.Router()

router.get("/", getAllClass)

export default router