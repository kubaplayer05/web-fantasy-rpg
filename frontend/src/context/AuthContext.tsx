import React, {createContext, useReducer} from "react";
import {getCookie} from "../lib/getCookie.ts";

interface Auth {
    username: String
    isAdmin?: Boolean
}

interface AuthAction {
    type?: String
    payload?: any
}

interface AuthProviderProps {
    children: React.ReactNode
}

interface AuthContext {
    state: Auth,
    dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContext | null>(null)

const reducer = (state: Auth, action: AuthAction) => {

    switch (action.type) {
        case "LOGIN":
            return {
                ...action.payload
            }
        case "LOGOUT":
            return {
                username: null,
                isAdmin: false
            }
        default:
            return state
    }
}

const createInitialState = () => {
    try {
        const user = getCookie("user")
        const json = JSON.parse(user)
        return {...json}
    } catch {
        return {username: null, isAdmin: false}
    }
}

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [state, dispatch] = useReducer(reducer, null, createInitialState)

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}