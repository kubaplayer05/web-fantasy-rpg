import {Form, Link} from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import {useEffect} from "react";
import {useActionData} from "react-router";
import {useAuthContext} from "../hooks/useAuthContext.ts";

export default function Login() {

    const actionData = useActionData()
    const {dispatch} = useAuthContext()

    useEffect(() => {
        if (actionData) {
            dispatch({type: "LOGIN", payload: actionData})
        }
    }, [actionData])

    return (
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[80%] max-w-[1000px]">
            <Form method="POST" className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-gray-300">Username:</label>
                    <Input name="username" placeholder="Warrior 123..." id="username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-gray-300">Password:</label>
                    <Input name="password" placeholder="Your password..." id="password" type="password"/>
                </div>
                <Link to="/register" className="text-center">Do not have account? Go to register page</Link>
                <Link to="/admin" className="text-center">Go to admin page</Link>
                <Button className="text-lg">Login</Button>
            </Form>
        </div>
    )
}

export async function loginAction({request}: any) {
    const url = `${import.meta.env.VITE_API_URL}/user/login`
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
