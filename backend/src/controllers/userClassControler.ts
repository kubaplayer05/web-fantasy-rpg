import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const getAllClass = async (req: Request, res: Response) => {

    const userClasses = await prisma.userClass.findMany()

    if (!userClasses) {
        return res.status(400).json({
            msg: "Could not find any class"
        })
    }

    res.status(200).json({
        content: userClasses
    })
}