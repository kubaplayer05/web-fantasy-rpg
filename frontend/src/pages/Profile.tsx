import {useLoaderData} from "react-router";
import swordIcon from "../assets/pixel-sword.png"
import heartIcon from "../assets/pixel-heart.png"
import shieldIcon from "../assets/pixel-shield.png"
import staminaIcon from "../assets/pixel-energy.png"
import bookIcon from "../assets/pixel-book.png"


export default function Profile() {

    const loaderData: any = useLoaderData()

    console.log(loaderData)

    const {equipedWeapon} = loaderData

    return (
        <div className="mx-auto w-[80%] max-w-[1600px] bg-gray-800 shadow-lg px-10 py-6 mt-10">
            {loaderData ? <div className="flex gap-2">
                    <div className="border-r-2 pr-4 border-r-gray-300 w-[25%]">
                        <h2 className="text-2xl py-4">Profile Info</h2>
                        <ul className="flex flex-col gap-1 px-4 py-2">
                            <li>Username: {loaderData.username}</li>
                            <li>class: {loaderData.class.name}</li>
                            <li>lvl: {loaderData.lvl}</li>
                            <li>exp: {loaderData.exp}</li>
                            <li>money: {loaderData.money}</li>
                        </ul>


                        <h2 className="text-2xl py-4 mt-8">Statistics</h2>
                        <ul className="flex flex-col gap-1 px-4 py-2">
                            <li className="flex gap-4 items-center">
                                <img className="w-[26px] h-[26px]" src={heartIcon} alt="HP"/>{
                                loaderData.hp}
                            </li>
                            <li className="flex gap-4 items-center">
                                <img className="w-[26px] h-[26px]" src={swordIcon} alt="ATK"/>{
                                loaderData.atk}
                            </li>
                            <li className="flex gap-4 items-center">
                                <img className="w-[26px] h-[26px]" src={shieldIcon} alt="DEF"/>{
                                loaderData.def}
                            </li>
                            <li className="flex gap-4 items-center">
                                <img className="w-[26px] h-[26px]" src={staminaIcon} alt="STA"/>{
                                loaderData.sta}
                            </li>
                            <li className="flex gap-4 items-center">
                                <img className="w-[26px] h-[26px]" src={bookIcon} alt="INT"/>{
                                loaderData.int}
                            </li>
                        </ul>
                    </div>
                    <div className="pl-4">
                        <h2 className="text-2xl py-4">Weapon</h2>
                        <ul className="flex flex-col gap-1 px-4 py-2">
                            {equipedWeapon && <>
                                <li>Name: {equipedWeapon.name} | <span className="lowercase">{equipedWeapon.rarity}</span>
                                </li>
                                <li>Required lvl: {equipedWeapon.minUserLvl}</li>
                                <li>Desc: {equipedWeapon.desc}</li>
                                <li>ATK: {equipedWeapon.atk}</li>
                                <li>DEF: {equipedWeapon.def}</li>
                                <li>INT: {equipedWeapon.int}</li>
                                <li>DEF: {equipedWeapon.sta}</li>
                            </>
                            }
                        </ul>
                    </div>
                </div> :
                <h2 className="text-center py-10 text-3xl text-red-400">Could not get user profile!</h2>}
        </div>
    )
}

export const profileLoader = async ({params}: any) => {

    const {username} = params
    const url = `${import.meta.env.VITE_API_URL}/user/profile/${username}`

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