import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express"
import {addWeaponToInventory, changeStats, equipWeapon} from "../utils/weaponUtils";
import dotenv from 'dotenv';

dotenv.config()

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
                classId: selectedClass.id,
            }
        })

        const inventory = await prisma.userInventory.create({
            data: {
                userId: user.id
            }
        })

        if (!user) {
            return res.status(400).json({error: "Could not create user"})
        }

        if (!inventory) {
            return res.status(400).json({error: "Could not create user inventory"})
        }

        const status1 = await addWeaponToInventory(user.id, selectedClass.id)

        if (!status1.ok) {
            return res.status(400).json({msg: "Could not add weapon to inventory", error: status1.error})
        }

        const status2 = await equipWeapon(user.id, selectedClass.id)

        if (!status2.ok) {
            return res.status(400).json({msg: "Could not equip weapon", error: status2.error})
        }

        const status3 = await changeStats(user.id)

        if (!status3.ok) {
            return res.status(400).json({msg: "Could not change user stats", error: status3.error})
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

export const createAdmin = async (req: Request, res: Response) => {

    const name = process.env.ADMIN_NAME
    const password = process.env.ADMIN_PASSWORD

    if (!password || !name) {
        return res.status(400).json({
            msg: "provide ADMIN_PASSWORD and ADMIN_NAME in .env"
        })
    }

    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const admin = await prisma.admin.create({
            data: {
                name: name,
                hashedPassword: hash
            }
        })

        const token = createToken(admin.id)

        res.cookie("token", token, {
            httpOnly: true,
        })

        res.cookie("user", JSON.stringify({name}), {
            httpOnly: false
        })

        return res.status(200).json({
            name
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            msg: "could not create admin account",
            error: err
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

export const loginAdmin = async (req: Request, res: Response) => {

    const {password, name} = req.body

    if (!password || !name) {
        return res.status(400).json({
            msg: "You must provide name and password"
        })
    }

    try {

        const admin = await prisma.admin.findUnique({
            where: {
                name
            }
        })

        if (!admin) {
            return res.status(400).json({
                msg: "Admin account with that name do not exist"
            })
        }

        const compare = await bcrypt.compare(password, admin.hashedPassword)

        if (!compare) {
            return res.status(400).json({
                msg: "Wrong password provided"
            })
        }

        const token = createToken(admin.id)

        res.cookie("token", token, {
            httpOnly: true,
        })

        res.cookie("user", JSON.stringify({username: name, isAdmin: true}), {
            httpOnly: false
        })

        return res.status(200).json({
            username: name,
            isAdmin: true
        })

    } catch (err: any) {
        res.status(400).json({
            msg: "could not login as admin account",
            error: err
        })
    }
}