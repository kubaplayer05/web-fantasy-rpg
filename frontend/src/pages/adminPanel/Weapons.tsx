import {useLoaderData} from "react-router";
import Rarity from "../../components/Rarity.tsx";
import swordIcon from "../../assets/pixel-sword.png"
import shieldIcon from "../../assets/pixel-shield.png"
import staminaIcon from "../../assets/pixel-energy.png"
import bookIcon from "../../assets/pixel-book.png"
import {Link} from "react-router-dom";
import Button from "../../components/Button.tsx";
import {useEffect, useState} from "react";


interface Weapon {
    id: number,
    name: string,
    desc: string,
    rarity: string,
    minUserLvl: number,
    atk: number,
    int: number,
    def: number,
    sta: number,
    isDefault: boolean
}

export default function Weapons() {

    const data: any = useLoaderData()
    const [weapons, setWeapons] = useState([])

    useEffect(() => {
        if (data) {
            setWeapons(data.weapons)
        }
    }, [data])

    console.log(data)

    const deleteWeapon = async (id: number) => {

        const url = `${import.meta.env.VITE_API_URL}/panel/weapon/delete`

        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            return null
        }

        return await response.json()
    }

    return (
        <div className="max-w-[1600px] mx-auto px-5">
            <div className="flex justify-between items-center py-4">
                <h2 className="text-4xl py-5">Weapons</h2>
                <Link className="px-4 py-2 bg-gray-700 rounded text-xl" to="/admin/panel/weapons/create">Create</Link>
            </div>
            <div className="flex flex-col gap-8">
                {weapons && weapons.map((weapon: Weapon) => {
                    return (
                        <div className="bg-blue-950 px-4 py-3 shadow-xl flex justify-between" key={weapon.id}>
                            <div>
                                <h3 className="text-2xl">{weapon.name} | <Rarity rarity={weapon.rarity}/></h3>
                                <p>{weapon.desc}</p>
                                <div className="flex gap-4 py-2">
                                    <div className="flex gap-2">
                                        <img className="w-[26px] h-[26px]" src={swordIcon} alt="ATK"/>
                                        {weapon.atk}
                                    </div>
                                    <div className="flex gap-2">
                                        <img className="w-[26px] h-[26px]" src={bookIcon} alt="INT"/>
                                        {weapon.int}
                                    </div>
                                    <div className="flex gap-2">
                                        <img className="w-[26px] h-[26px]" src={shieldIcon} alt="DEF"/>
                                        {weapon.def}
                                    </div>
                                    <div className="flex gap-2">
                                        <img className="w-[26px] h-[26px]" src={staminaIcon} alt="STA"/>
                                        {weapon.sta}
                                    </div>
                                </div>
                                <p className="text-gray-400">Min. user level to
                                    equip: {weapon.minUserLvl} {weapon.isDefault && <span>
                                    | This weapon is default and can't be deleted
                                </span>}</p>
                            </div>
                            <Button onClick={() => {
                                deleteWeapon(weapon.id).then(() => {
                                    const newWeapons = weapons.filter((w: Weapon) => w.id !== weapon.id)
                                    setWeapons(newWeapons)
                                })
                            }} disabled={weapon.isDefault}
                                    className="bg-red-800 font-medium px-2 py-1 disabled:bg-gray-600">X</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const weaponsLoader = async () => {

    const url = `${import.meta.env.VITE_API_URL}/panel/weapon/all`

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        return null
    }

    console.log(response)

    return await response.json()

}