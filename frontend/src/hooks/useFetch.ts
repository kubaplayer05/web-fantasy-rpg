import {useState} from "react";

export const useFetch = (route: string, options: any) => {

    const url = `${import.meta.env.VITE_API_URL}${route}`

    const [data, setData] = useState({})
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {

        setIsLoading(true)

        const response = await fetch(url, options)

        if (!response.ok) {
            console.error(response)
            setError("Could not fetch")
        }

        setData(await response.json())
        setIsLoading(false)
        setError("")
    }

    return {
        data,
        fetchData,
        error,
        isLoading
    }
}