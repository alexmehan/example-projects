import { useState, useEffect } from "react"
import useMovies from "./useMovies"
import useImageConfiguration from "./useImageCongfiguration"

export default function MovieSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const {movies, moviesLoading, moviesError} = useMovies({searchQuery, currentPage})
    const {imageConfig, configLoading, configError} = useImageConfiguration()
    const baseUrl = imageConfig ? imageConfig.secure_base_url + '/w500' : ""

    if (moviesLoading || configLoading) return <p>Loading...</p>;
    if (moviesError || configError) return <p className="text-red-500">Error: {error}</p>

    function searchMovies(formData) {
        setSearchQuery(formData.get("movie-search"))
    }

    function handlePageChange(page) {
        setCurrentPage(page)
    }

    const movieElements = movies.map(movie => (
        <div className="flex flex-col flex-wrap">
            <img src={baseUrl + movie.poster_path} />
            <h3 className="text-2xl font-bold text-center text-indigo-500">{movie.title}</h3>
        </div>
    ))

    return (
        <section className="py-8 border-b border-black w-full">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Movie Search Page</h2>
            <form action={searchMovies} className="mb-4">
                <input type="text" name="movie-search" className="border mr-4 px-3 py-2"></input>
                <button className="bg-gray-200 px-3 py-2">Search</button>
            </form>
            
            <div className="grid grid-cols-4 gap-8">
                {movieElements}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <button className="bg-gray-200 px-3 py-2" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                <button className="bg-gray-200 px-3 py-2" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </section>
    )
}