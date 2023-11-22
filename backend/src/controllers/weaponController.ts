import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express";

const prisma = new PrismaClient()

export const createWeapon = async (req: Request, res: Response) => {

    const {name, desc, minUserLvl, classId, atk, def, int, sta, rarity} = req.body

    if (!name || !desc) {
        return res.status(400).json({
            msg: "Provide value for name and desc"
        })
    }

    try {

        const weapon = await prisma.weapon.create({
            data: {
                name,
                desc,
                minUserLvl,
                classId,
                atk,
                def,
                int,
                sta,
                rarity
            }
        })

        if (!weapon) {
            return res.status(400).json({
                msg: "Could not create new weapon"
            })
        }

        return res.status(200).json({
            ...weapon
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            msg: "Could not create new weapon"
        })
    }
}

export const getAllUserWeapons = async (req: Request, res: Response) => {

    if (!("user" in req)) {
        return res.status(400).json({
            msg: "User property does not exist on the Request object",
        });
    }

    const user: any = req.user;

    try {

        const weapons = await prisma.userInventory.findUnique({
            where: {
                userId: user.id
            },
            select: {
                ownedWeapons: true
            }
        })

        return res.status(200).json({
            weapons
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            msg: "could not find user weapons",
            error: err
        })
    }
}

export const getAllUWeapons = async (req: Request, res: Response) => {

    try {

        const weapons = await prisma.weapon.findMany({})

        return res.status(200).json({
            weapons
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            msg: "could not get weapons",
            error: err
        })
    }
}