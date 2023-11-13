import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import Register, {registerAction, registerLoader} from "./pages/Register.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/register",
        element: <Register/>,
        loader: registerLoader,
        action: registerAction
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>,
)
