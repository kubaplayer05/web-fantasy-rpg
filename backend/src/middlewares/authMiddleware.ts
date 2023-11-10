import {NextFunction, Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {token} = req.cookies

        if (!process.env.SECRET) {
            return res.status(500).json({
                msg: "The SECRET must be provided in .env"
            })
        }

        // @ts-ignore
        const {id} = jwt.verify(token, process.env.SECRET)

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return res.status(403).json({
                error: "Wrong authorization token"
            })
        }

        req.user = user
        next()

    } catch (err: any) {
        res.status(401).json({
            msg: "Request is not authorized"
        })
    }
}

export default authMiddleware