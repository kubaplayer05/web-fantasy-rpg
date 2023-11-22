import express from "express"
import {createWeapon, getAllUWeapons} from "../controllers/weaponController";
import {createMonster, getAllMonsters} from "../controllers/monsterController";
import {createSkill, getSkills} from "../controllers/skillController";

const router = express.Router()

router.post("/monster/create", createMonster)
router.post("/weapon/create", createWeapon)
router.post("/skill/create", createSkill)

router.get("/monster/all", getAllMonsters)
router.get("/skill/all", getSkills)
router.get("/weapon/all", getAllUWeapons)

export default router