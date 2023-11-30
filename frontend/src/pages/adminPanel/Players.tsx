import {useLoaderData} from "react-router";
import {useEffect, useState} from "react";

interface User {
    username: string,
    hp: number,
    akt: number,
    def: number,
    int: number,
    sta: number,
    lvl: number,
    exp: number,
    money: number,
    class: Class,
}

interface Class {
    name: string,
}

export default function Players() {

    const loaderData: any = useLoaderData()
    const [users, setUsers] = useState<User[]>([])


    useEffect(() => {
        if (loaderData) {
            setUsers(loaderData.users)
        }
    }, []);

    console.log(loaderData)

    return (
        <div className="max-w-[1600px] mx-auto py-8 px-5">
            <h2 className="text-4xl">Players</h2>
            <ul className="py-6 flex-col flex gap-4">
                {users && users.map(user => {
                    return (
                        <li className="bg-blue-900 px-4 py-3 flex gap-4 w-full" key={user.username}>
                            <div className=" w-full flex gap-6 items-center">
                                <span className="text-2xl">{user.username}</span>
                                <span>Class: {user.class.name}</span>
                                <span>HP: {user.hp}</span>
                                <span>ATK: {user.akt}</span>
                                <span>DEF: {user.def}</span>
                                <span>INT: {user.int}</span>
                                <span>STA: {user.sta}</span>
                                <span>LVL: {user.lvl}</span>
                                <span>EXP: {user.exp}</span>
                                <span>Money: {user.money}</span>
                            </div>
                        </li>
                    )

                })}
            </ul>
        </div>
    )
}

export const playersLoader = async () => {

    const url = `${import.meta.env.VITE_API_URL}/panel/user/all`

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