import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express";

const prisma = new PrismaClient()

export const createSkill = async (req: Request, res: Response) => {

    const {name, desc, baseDmg, classId, turnCount, stuning, bleeding} = req.body

    try {

        const skill = await prisma.skill.create({
            data: {
                name,
                desc,
                baseDmg,
                classId,
                turnCount,
                stuning,
                bleeding
            }
        })

        return res.status(200).json({
            skill
        })

    } catch (err) {
        return res.status(400).json({
            error: err,
            msg: "could not create a new skill"
        })
    }
}

export const getSkills = async (req: Request, res: Response) => {

    try {

        const skills = await prisma.skill.findMany({})

        return res.status(200).json({
            skills
        })

    } catch (err) {
        return res.status(400).json({
            msg: "could not get skills",
            error: err
        })
    }
}