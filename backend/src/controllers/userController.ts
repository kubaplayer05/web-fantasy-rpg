import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express";

const prisma = new PrismaClient()

export const getUserProfile = async (req: Request, res: Response) => {

    const {username} = req.params

    if (!username) {
        return res.status(400).json({
            msg: "You must provide username"
        })
    }

    try {

        const userProfile = await prisma.user.findUnique({
            where: {
                username
            },
            select: {
                username: true,
                class: {
                    select: {
                        name: true
                    }
                },
                money: true,
                exp: true,
                lvl: true,
                hp: true,
                atk: true,
                def: true,
                int: true,
                sta: true
            }
        })

        if (!userProfile) {
            return res.status(400).json({
                msg: "User profile not found",
            })
        }

        return res.status(200).json({
            ...userProfile
        })

    } catch (err) {
        return res.status(400).json({
            msg: "Could not fetch user profile",
            error: err
        })
    }
}
