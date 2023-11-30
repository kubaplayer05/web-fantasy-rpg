import express from "express"
import {createWeapon, deleteWeapon, getAllUWeapons} from "../controllers/weaponController";
import {createMonster, getAllMonsters} from "../controllers/monsterController";
import {createSkill, getSkills} from "../controllers/skillController";
import {getAllUsers} from "../controllers/userController";

const router = express.Router()

router.post("/monster/create", createMonster)
router.post("/weapon/create", createWeapon)
router.delete("/weapon/delete", deleteWeapon)
router.post("/skill/create", createSkill)

router.get("/monster/all", getAllMonsters)
router.get("/skill/all", getSkills)
router.get("/weapon/all", getAllUWeapons)
router.get("/user/all", getAllUsers)

export default router