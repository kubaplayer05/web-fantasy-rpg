import {useAuthContext} from "../hooks/useAuthContext.ts";
import Button from "../components/Button.tsx";
import {Outlet} from "react-router";
import {Link} from "react-router-dom";

export default function RootLayout() {

    const {state, dispatch} = useAuthContext()

    const logoutHandler = () => {
        dispatch({type: "LOGOUT"})
    }

    return (
        <>
            <header
                className="flex items-center justify-between max-w-[1600px] p-6 mx-auto border-b-2 border-b-gray-300">
                <h1 className="text-2xl">
                    <Link to="/"> WEB RPG </Link>
                </h1>
                <div className="flex gap-6 items-center">
                    <Link to={`/profile/${state.username}`}>{state.username}</Link>
                    <Button className="text-lg px-2 py-2" onClick={logoutHandler}>Logout</Button>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}