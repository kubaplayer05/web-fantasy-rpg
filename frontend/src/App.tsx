import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register, {registerAction, registerLoader} from "./pages/Register.tsx";
import {useAuthContext} from "./hooks/useAuthContext.ts";
import {Navigate} from "react-router-dom";

export default function App() {

    const {state} = useAuthContext()

    console.log(state)

    const router = createBrowserRouter([
        {
            path: "/",
            element: state.username ? <h1>WEB RPG</h1> : <Navigate to="/register"/>
        },
        {
            path: "/register",
            element: !state.username ? <Register/> : <Navigate to="/"/>,
            loader: registerLoader,
            action: registerAction
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}