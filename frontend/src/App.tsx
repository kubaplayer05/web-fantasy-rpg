import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register, {registerAction, registerLoader} from "./pages/Register.tsx";
import {useAuthContext} from "./hooks/useAuthContext.ts";
import {Navigate} from "react-router-dom";
import Login, {loginAction} from "./pages/Login.tsx";
import RootLayout from "./Layout/RootLayout.tsx";

export default function App() {

    const {state} = useAuthContext()

    const router = createBrowserRouter([
        {
            path: "/",
            element: state.username ? <RootLayout/> : <Navigate to="/register"/>,
            children: [
                {
                    path: "/"
                }
            ]
        },
        {
            path: "/register",
            element: !state.username ? <Register/> : <Navigate to="/"/>,
            loader: registerLoader,
            action: registerAction
        },
        {
            path: "/login",
            element: !state.username ? <Login/> : <Navigate to="/"/>,
            action: loginAction
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}