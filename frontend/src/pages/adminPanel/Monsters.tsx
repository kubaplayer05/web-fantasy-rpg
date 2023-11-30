import {useLoaderData} from "react-router";
import {useEffect, useState} from "react";

interface Monster {
    id: number,
    name: string,
    desc: string,
    baseExp: number,
    hp: number,
    atk: number,
    def: number,
    int: number,
    sta: number,
    lvl: number,
}

export default function Monsters() {

    const loaderData: any = useLoaderData()

    const [monsters, setMonsters] = useState<Monster[]>([])

    useEffect(() => {
        setMonsters(loaderData.monsters)
    }, []);

    console.log(loaderData)

    return (
        <div className="max-w-[1600px] mx-auto py-8 px-5">
            <h2 className="text-4xl">Monsters</h2>
            <ul className="py-6 flex-col flex gap-4">
                {monsters && monsters.map(skill => {
                    return (
                        <li className="bg-blue-900 px-4 py-3 flex gap-4 w-full" key={skill.id}>
                            <div className=" w-full flex gap-6 items-center">
                                <span className="text-2xl">{skill.name}</span>
                                <span>{skill.desc}</span>
                                <span>Base Experience: {skill.baseExp}</span>
                                <span>Health: {skill.hp}</span>
                                <span>Attack: {skill.atk}</span>
                                <span>Defense: {skill.def}</span>
                                <span>Intelligence: {skill.int}</span>
                                <span>Stamina: {skill.sta}</span>
                                <span>Level: {skill.lvl}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const monstersLoader = async () => {

    const url = `${import.meta.env.VITE_API_URL}/panel/monster/all`

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

    return await response.json()
}