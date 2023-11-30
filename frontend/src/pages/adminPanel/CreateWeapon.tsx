import {Form} from "react-router-dom";
import Input from "../../components/Input.tsx";
import Button from "../../components/Button.tsx";
import {redirect, useActionData} from "react-router";

export default function CreateWeapon() {

    const actionData = useActionData()

    console.log(actionData)

    return (
        <div className="max-w-[1600px] mx-auto py-10">
            <Form method="POST"
                  className="bg-blue-950 px-5 py-5 max-w-[1200px] mx-auto flex flex-col gap-5 rounded shadow-xl">
                <h2 className="text-center text-2xl font-semibold">Create new Weapon</h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <Input id="name" name="name"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="desc">Description</label>
                    <textarea id="desc" name="desc"
                              className="border-gray-300 border-2 bg-transparent px-2 py-3"></textarea>
                </div>
                <div className="flex gap-4 justify-between items-center">
                    <div className="flex flex-col gap-2 w-full">
                        <label>Select class</label>
                        <select name="classId" className="px-4 py-3 bg-gray-700 border-gray-300 border-2"
                                defaultValue="1">
                            <option value="1">Swordsman</option>
                            <option value="2">Mage</option>
                            <option value="3">Archer</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Select rarity</label>
                        <select name="rarity" className="px-4 py-3 bg-gray-700 border-gray-300 border-2"
                                defaultValue="COMMON">
                            <option value="COMMON">Common</option>
                            <option value="UNCOMMON">Uncommon</option>
                            <option value="RARE">Rare</option>
                            <option value="EPIC">Epic</option>
                            <option value="LEGENDARY">Legendary</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-2 justify-between">
                        <label htmlFor="atk">Attack</label>
                        <Input className="w-full" id="atk" name="atk" type="number" defaultValue="1" min="1" max="99"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="def">Defense</label>
                        <Input className="w-full" id="def" name="def" type="number" defaultValue="1" min="1" max="99"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="int">Intelligence</label>
                        <Input className="w-full" id="int" name="int" type="number" defaultValue="1" min="1" max="99"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="sta">Stamina</label>
                        <Input className="w-full" id="sta" name="sta" type="number" defaultValue="1" min="1" max="99"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="minUserLvl">Min user level</label>
                        <Input className="w-full" id="minUserLvl" name="minUserLvl" type="number" defaultValue="1"
                               min="1" max="99"/>
                    </div>
                </div>
                <Button className="bg-green-900">Submit</Button>
            </Form>
        </div>
    )
}

export const createWeaponAction = async ({request}: any) => {

    const url = `${import.meta.env.VITE_API_URL}/panel/weapon/create`
    const data = Object.fromEntries(await request.formData());

    data.minUserLvl *= 1
    data.classId *= 1
    data.atk *= 1
    data.def *= 1
    data.int *= 1
    data.sta *= 1

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)

    if (!response.ok) {
        return null
    }

    return redirect("/admin/panel/weapons")
}