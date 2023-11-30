import {Form, Link} from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import {useEffect} from "react";
import {useActionData} from "react-router";
import {useAuthContext} from "../hooks/useAuthContext.ts";

export default function Admin() {

    const actionData = useActionData()
    const {dispatch} = useAuthContext()

    console.log(actionData)

    useEffect(() => {
        if (actionData) {
            dispatch({type: "LOGIN", payload: actionData})

        }
    }, [actionData])

    return (
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[80%] max-w-[1000px]">
            <Form method="POST" className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-gray-300">Admin name:</label>
                    <Input name="name" placeholder="Default name for admin is admin" id="username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-gray-300">Password:</label>
                    <Input name="password" placeholder="Admin password..." id="password" type="password"/>
                </div>
                <Link className="text-center" to="/login">Go to login page</Link>
                <Button className="text-lg">Login as Admin</Button>
            </Form>
        </div>
    )
}

export async function adminAction({request}: any) {
    const url = `${import.meta.env.VITE_API_URL}/user/login/admin`
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