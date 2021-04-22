import { useState } from "react"
import "../styles/globals.scss"

export default function MyApp({ Component, pageProps }) {
    const [lastPage, setLastPage] = useState("home")

    const [sortOrder, setSortOrder] = useState("r")
    const [initialProjectsForNew, setInitialProjectsForNew] = useState([])
    const [moreProjects, setMoreProjects] = useState([])
    const [loading, setLoading] = useState(false)

    const changeSortOrder = (newOrder) => setSortOrder(newOrder)
    const addInitialProjectsForNew = (initialProjects) => setInitialProjectsForNew(initialProjects)
    const emptyMoreProjects = () => setMoreProjects([])
    const updateMoreProjects = (newProjects) => setMoreProjects((projects) => [...projects, ...newProjects])
    const changeLoading = (v) => setLoading(v)

    return (
        <Component
            {...pageProps}
            lastPage={lastPage}
            setLastPage={setLastPage}
            sortOrder={sortOrder}
            changeSortOrder={changeSortOrder}
            initialProjectsForNew={initialProjectsForNew}
            addInitialProjectsForNew={addInitialProjectsForNew}
            moreProjects={moreProjects}
            emptyMoreProjects={emptyMoreProjects}
            updateMoreProjects={updateMoreProjects}
            loading={loading}
            changeLoading={changeLoading}
        />
    )
}
