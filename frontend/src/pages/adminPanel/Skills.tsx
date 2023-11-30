import {useLoaderData} from "react-router";
import {useEffect, useState} from "react";

interface Skill {
    id: number,
    baseDmg: number,
    bleeding: boolean,
    stuning: boolean,
    turnCount?: number,
    name: string,
    desc: string
}

export default function Skills() {

    const loaderData: any = useLoaderData()

    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        setSkills(loaderData.skills)
    }, []);

    console.log(loaderData)

    return (
        <div className="max-w-[1600px] mx-auto py-8 px-5">
            <h2 className="text-4xl">Skills</h2>
            <ul className="py-6 flex-col flex gap-4">
                {skills && skills.map(skill => {
                    return (
                        <li className="bg-blue-900 px-4 py-3 flex gap-4 w-full" key={skill.id}>
                            <div className=" w-full flex gap-6 items-center">
                                <span className="text-2xl">{skill.name}</span>
                                <span>{skill.desc}</span>
                                <span>Base Damage: {skill.baseDmg}</span>
                                <span>Bleeding: {skill.bleeding ? "Yes" : "No"}</span>
                                <span>Stuning: {skill.stuning ? "Yes" : "No"}</span>
                                <span>Turn Count: {skill.turnCount ? skill.turnCount : "None"}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const skillsLoader = async () => {

    const url = `${import.meta.env.VITE_API_URL}/panel/skill/all`

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