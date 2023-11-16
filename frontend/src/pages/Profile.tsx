import {useLoaderData} from "react-router";

export default function Profile() {

    const loaderData: any = useLoaderData()

    return (
        <div className="mx-auto w-[80%] max-w-[1600px]">
            {loaderData ? <div className="bg-blue-950 shadow-lg px-10 py-6 mt-10">
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
                        <li>HP: {loaderData.hp}</li>
                        <li>ATK: {loaderData.atk}</li>
                        <li>DEF: {loaderData.def}</li>
                        <li>INT: {loaderData.int}</li>
                        <li>STA: {loaderData.sta}</li>
                    </ul>
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