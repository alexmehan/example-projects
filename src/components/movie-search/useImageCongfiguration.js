import { useState, useEffect } from "react"
import axios from "axios"

export default function useImageConfiguration() {
    const [imageConfig, setImageConfig] = useState([])
    const [configLoading, setLoading] = useState(true)
    const [configError, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        setLoading(true)
        setError(null)
        axios.get("https://api.themoviedb.org/3/configuration", {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTRhMWNjZTE4MDYxNTU0OWNjYWQxZjk4NzA5MjZlMCIsIm5iZiI6MTc1MTI1OTI2NC42Miwic3ViIjoiNjg2MjE4ODAxMWMxYWJhN2M5NzE4OTMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yUogV9FE6ns4cjRR0pchSU0ArgNE7zwEVxM4caFnbHI'
            },
            signal: controller.signal
        })
        .then(res => setImageConfig(res.data.images))
        .catch((err) => {
            if (axios.isCancel(err)) return
            setError(err.message || "Something went wrong")
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, [])

    return {imageConfig, configLoading, configError}
}