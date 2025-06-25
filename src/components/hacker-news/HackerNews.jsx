import { useState, useEffect } from "react"

export default function HackerNews() {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=12')
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
                            setArticles(prev => [...prev, jsonData])
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const articleElements = articles.map((article) => (
        <div className="shadow-md rounded-md p-8 flex justify-center flex-col flex-wrap border border-gray-300">
            <h3 className="text-xl font-weight-500 text-indigo-500"><a href={article.url}>{article.title}</a></h3>
            <div>
                <span>Score: {article.score}</span> <span>by {article.by}</span>
            </div>
        </div>
    ))

    return (
        <section className="py-8 border-b border-black">
            <h2 className="font-extrabold text-4xl mb-4 text-center">Top 10 Articles - Hacker News</h2>
            <div className="grid grid-cols-4 gap-6">
                {articleElements}
            </div>
        </section>
    )
}

