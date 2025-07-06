import { useState, useEffect } from "react"
import axios from "axios"

export default function useMovies({searchQuery, currentPage}) {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        const url = searchQuery ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${currentPage}` : "https://api.themoviedb.org/3/discover/movie"

        setLoading(true)
        setError(null)

        axios.get(url, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTRhMWNjZTE4MDYxNTU0OWNjYWQxZjk4NzA5MjZlMCIsIm5iZiI6MTc1MTI1OTI2NC42Miwic3ViIjoiNjg2MjE4ODAxMWMxYWJhN2M5NzE4OTMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.yUogV9FE6ns4cjRR0pchSU0ArgNE7zwEVxM4caFnbHI'
            },
            signal: controller.signal
        })
            .then(res => setMovies(res.data.results))
            .catch((err) => {
                if (axios.isCancel(err)) return
                setError(err.message || "Something went wrong") 
                console.log(err)
            })
            .finally(() => setLoading(false))

        return () => controller.abort()
    }, [searchQuery, currentPage])

    return {movies, error, loading}
}