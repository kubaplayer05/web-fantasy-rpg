import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register, {registerAction, registerLoader} from "./pages/Register.tsx";
import {useAuthContext} from "./hooks/useAuthContext.ts";
import {Navigate} from "react-router-dom";
import Login, {loginAction} from "./pages/Login.tsx";
import RootLayout from "./Layout/RootLayout.tsx";
import Profile, {profileLoader} from "./pages/Profile.tsx";
import Admin, {adminAction} from "./pages/Admin.tsx";
import AdminPanelLayout from "./Layout/AdminPanelLayout.tsx";
import Players from "./pages/adminPanel/Players.tsx";
import Weapons, {weaponsLoader} from "./pages/adminPanel/Weapons.tsx";
import CreateWeapon, {createWeaponAction} from "./pages/adminPanel/CreateWeapon.tsx";

export default function App() {

    const {state} = useAuthContext()

    const router = createBrowserRouter([
        {
            path: "/",
            element: (state.username && !state.isAdmin) ? <RootLayout/> : <Navigate to="/login"/>,
            children: [
                {
                    path: "/profile/:username",
                    element: <Profile/>,
                    loader: profileLoader
                },
                {
                    path: "/profile",
                    element: <Navigate to={`/profile/${state.username}`}/>
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
        },
        {
            path: "/admin",
            element: (!state.username && !state.isAdmin) ? <Admin/> : <Navigate to="/admin/panel"/>,
            action: adminAction,
        },
        {
            path: "/admin/panel",
            element: (state.username && state.isAdmin) ? <AdminPanelLayout/> : <Navigate to="/login"/>,
            children: [
                {
                    path: "/admin/panel",
                    element: <Navigate to="/admin/panel/players"/>
                },
                {
                    path: "/admin/panel/players",
                    element: <Players/>
                },
                {
                    path: "/admin/panel/weapons",
                    element: <Weapons/>,
                    loader: weaponsLoader
                },
                {
                    path: "/admin/panel/weapons/create",
                    element: <CreateWeapon/>,
                    action: createWeaponAction
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}