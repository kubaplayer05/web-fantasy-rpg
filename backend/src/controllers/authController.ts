import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {PrismaClient} from '@prisma/client'
import {Request, Response} from "express"

const prisma = new PrismaClient()

const createToken = (id: string) => {
    const secret = process.env.SECRET

    if (!secret) throw Error("Secret key, not provided in .env (SECRET='...')")

    return jwt.sign({id}, secret, {expiresIn: "24h"})
}

export const registerHandler = async (req: Request, res: Response) => {

    const {username, password, userClass} = req.body

    if (!username || !password) {
        return res.status(400).json({
            msg: "You must provide all data"
        })
    }

    const existedUser = await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if (existedUser) {
        return res.status(400).json({
            msg: "Username is already used"
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            msg: "Password is not strong enough"
        })
    }

    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const selectedClass = await prisma.userClass.findFirst({
            where: {
                name: userClass
            },
            select: {
                id: true
            }
        })

        if (!selectedClass) {
            return res.status(400).json({error: "You must select correct class"})
        }

        const user = await prisma.user.create({
            data: {
                username,
                hashedPassword: hash,
                classId: selectedClass.id
            }
        })

        if (!user) {
            return res.status(400).json({error: "Could not create user"})
        }

        const token = createToken(user.id)

        res.cookie("token", token, {
            httpOnly: true,
        })

        res.cookie("user", JSON.stringify({username}), {
            httpOnly: false
        })

        return res.status(200).json({
            username
        })

    } catch (err: any) {
        res.status(400).json({
            error: err.message
        })
    }
}

export const loginHandler = async (req: Request, res: Response) => {

    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({
            msg: "You must provide all data"
        })
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            return res.status(400).json({
                msg: "User with that username do not exist"
            })
        }

        const compare = await bcrypt.compare(password, user.hashedPassword)

        if (!compare) {
            return res.status(400).json({
                msg: "Wrong password provided"
            })
        }

        const token = createToken(user.id)

        res.cookie("token", token, {
            httpOnly: true,
        })

        res.cookie("user", JSON.stringify({username}), {
            httpOnly: false
        })

        return res.status(200).json({
            username
        })

    } catch (err: any) {
        res.status(400).json({
            msg: err.message
        })
    }
}

