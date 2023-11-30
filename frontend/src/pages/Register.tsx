import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import {useActionData, useLoaderData} from "react-router";
import React, {useEffect} from "react";
import {Form, Link} from "react-router-dom";
import {atom, useAtom} from "jotai";
import {useAuthContext} from "../hooks/useAuthContext.ts";

interface UserClass {
    id: number,
    name: string,
    desc: string
}

const selectedIndexAtom = atom(0)

export default function Register() {

    const {dispatch} = useAuthContext()
    const classes = useLoaderData()
    const actionData = useActionData()
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)

    useEffect(() => {
        if (actionData) {
            dispatch({type: "LOGIN", payload: actionData})
        }
    }, [actionData])

    const changeDesc = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIndex(e.target.options.selectedIndex)
    }

    return (
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[80%] max-w-[1000px]">
            <Form method="POST" className="flex gap-4 bg-gray-800 p-8 rounded-lg shadow">
                <div className="flex flex-col gap-6 px-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-gray-300">Username:</label>
                        <Input name="username" placeholder="Warrior 123..." id="username"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-300">Password:</label>
                        <Input name="password" placeholder="Your password..." id="password" type="password"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300">Choose your class: -{">"}</label>
                        <select name="userClass" onChange={changeDesc}
                                className="appearance-none px-4 py-2.5 bg-transparent border-2 border-gray-100 rounded">
                            {Array.isArray(classes) && classes.map(({id, name}: UserClass) => {
                                return (
                                    <option key={id}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button className="text-lg">Create Account</Button>
                        <Link className="text-center" to="/login">or go to Login page</Link>
                        <Link to="/admin" className="text-center">(Go to admin page)</Link>
                    </div>
                </div>
                <div className="border-l-2 border-l-gray-300 px-4">
                    <span className="text-gray-300">Description:</span>
                    <p className="p-2 text-lg ">
                        {Array.isArray(classes) && classes[selectedIndex].desc}
                    </p>
                </div>
            </Form>
        </div>
    )
}

export async function registerLoader() {

    const url = `${import.meta.env.VITE_API_URL}/userClass`

    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        return null
    }

    const {content} = await response.json()

    return content
}

export async function registerAction({request}: any) {

    const url = `${import.meta.env.VITE_API_URL}/user/register`
    const data = Object.fromEntries(await request.formData());

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
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