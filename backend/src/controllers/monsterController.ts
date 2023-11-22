import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express";

const prisma = new PrismaClient()

export const createMonster = async (req: Request, res: Response) => {

    const {name, desc, baseExp, hp, atk, def, sta, int, lvl} = req.body

    try {

        const monster = await prisma.monster.create({
            data: {
                name,
                desc,
                baseExp,
                hp,
                atk,
                def,
                sta,
                int,
                lvl
            }
        })

        return res.status(200).json({
            monster
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            msg: "could not create a new monster",
            error: err
        })
    }
}

export const getAllMonsters = async (req: Request, res: Response) => {

    try {

        const monsters = await prisma.monster.findMany({})

        return res.status(200).json({
            monsters
        })

    } catch (err) {
        return res.status(400).json({
            msg: "could not get monsters",
            error: err
        })
    }
}