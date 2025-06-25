import { useState, useEffect } from "react"

export default function HackerNews() {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not get articles")
                }
                return response.json()
            })
            .then((jsonData) => {
                jsonData.map((item) => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Could not get article for item id ${item}`)
                            }
                            return response.json()
                        })
                        .then((jsonData)  => {
                            // console.log(jsonData)
                            setArticles(prev => [...prev, jsonData])
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                // setArticles(jsonData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(articles)

    useEffect(() => {
        
    }, [])

    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Top 10 Articles - Hacker News</h2>
        </section>
    )
}

