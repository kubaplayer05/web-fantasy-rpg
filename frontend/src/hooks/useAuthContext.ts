import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export const useAuthContext = () => {

    const ctx = useContext(AuthContext)

    if (!ctx) {
        throw Error("You must use AuthContext inside AuthProvider")
    }

    return ctx
}