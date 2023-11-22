import {NextFunction, Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {token} = req.cookies

        if (!process.env.SECRET) {
            return res.status(500).json({
                msg: "The SECRET must be provided in .env"
            })
        }

        // @ts-ignore
        const {id} = jwt.verify(token, process.env.SECRET)

        const admin = await prisma.admin.findUnique({
            where: {
                id
            }
        })

        if (!admin) {
            return res.status(403).json({
                error: "Wrong authorization token"
            })
        }

        next()

    } catch (err: any) {
        return res.status(401).json({
            msg: "Request is not authorized"
        })
    }
}

export default adminAuthMiddleware