import {Link, useLocation} from "react-router-dom";
import {Outlet} from "react-router";
import Button from "../components/Button.tsx";
import {useAuthContext} from "../hooks/useAuthContext.ts";

export default function AdminPanelLayout() {

    const location = useLocation()
    const locationArr = location.pathname.split("/")
    const active = locationArr[locationArr.length - 1]

    const activeLinkStyle = "text-blue-800"

    const {dispatch} = useAuthContext()

    const logoutHandler = () => {
        dispatch({type: "LOGOUT"})
    }

    return (
        <>
            <header
                className="flex justify-between items-center max-w-[1600px] p-6 mx-auto border-b-2 border-b-gray-300">
                <h1>Admin Panel</h1>
                <div className="flex gap-5 items-center capitalize">
                    <Link className={active === "players" ? activeLinkStyle : ""}
                          to="/admin/panel/players">players</Link>
                    <Link className={active === "skills" ? activeLinkStyle : ""}
                          to="/admin/panel/skills">skills</Link>
                    <Link className={active === "monsters" ? activeLinkStyle : ""}
                          to="/admin/panel/monsters">monsters</Link>
                    <Link className={active === "weapons" ? activeLinkStyle : ""}
                          to="/admin/panel/weapons">weapons</Link>
                    <Button onClick={() => {
                        logoutHandler()
                    }}>Logout</Button>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}