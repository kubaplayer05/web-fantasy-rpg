import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const equipWeapon = async (userId: string, weaponId: number) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
        })

        const weapon = await prisma.weapon.findUnique({
            where: {
                id: weaponId
            },
            include: {
                userClass: true
            }
        })

        console.log(user)
        console.log(weapon)

        if (!user || !weapon) {
            return {
                ok: false,
                error: "User or weapon not find"
            }
        }

        //TODO: check if user have weapon in inventory

        if (user.lvl >= weapon.minUserLvl && user.classId === weapon.classId) {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    equipedWeaponId: weaponId
                }
            })
        } else return {ok: false, error: "Wrong class or not enough lvl"}

        return {
            ok: true,
        }

    } catch (err: any) {
        return {
            ok: false,
            error: err
        }
    }
}

export const addWeaponToInventory = async (userId: string, weaponId: number) => {

    try {

        const inventory = await prisma.userInventory.update({
            where: {
                userId
            },
            data: {
                ownedWeapons: {
                    connect: [
                        {
                            id: weaponId
                        }
                    ]
                }
            }
        })

        console.log(inventory)

        return {
            ok: true
        }

    } catch (err: any) {
        return {
            ok: false,
            error: err
        }
    }
}

export const changeStats = async (userId: string) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                equipedWeapon: true
            }
        })

        if (!user || !user.equipedWeapon) {
            return {
                ok: false,
                error: "user or equipedWeapon not find"
            }
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                atk: user.atk + user.equipedWeapon.atk,
                def: user.def + user.equipedWeapon.def,
                sta: user.sta + user.equipedWeapon.sta,
                int: user.int + user.equipedWeapon.int
            }
        })

        return {
            ok: true
        }

    } catch (err: any) {
        return {
            ok: false,
            error: err
        }
    }
}