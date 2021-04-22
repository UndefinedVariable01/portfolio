import { useEffect, useRef } from "react"
import Head from "next/head"
import Link from "next/link"
import { getNumberOfProjects, getRecommendedProjects } from "../library/operations"
import ProjectCard from "../components/ProjectCard"
import Footer from "../components/Footer"
import utils from "../styles/utils.module.scss"
import styles from "../styles/Projects.module.scss"

const { layout, link, title, cardsContainer } = utils
const { layoutPadding, navLink, infoContainer, projectsTitle, sortOptions, lightText, divider, projectsContainer } = styles

export default function Projects(props) {
    const {
        setLastPage,
        numberOfProjects,
        staticProjects,
        sortOrder,
        changeSortOrder,
        initialProjectsForNew,
        addInitialProjectsForNew,
        moreProjects,
        emptyMoreProjects,
        updateMoreProjects,
        loading,
        changeLoading,
    } = props

    useEffect(() => {
        setLastPage("projects")
    }, [])

    useEffect(() => {
        emptyMoreProjects()
        if (sortOrder === "n" && initialProjectsForNew.length === 0) {
            ;(async () => {
                const res = await fetch("/api/projects")
                const initialProjects = await res.json()
                addInitialProjectsForNew(initialProjects)
            })()
        }
    }, [sortOrder])

    const projectsList = useRef()

    useEffect(() => {
        if (moreProjects.length + 7 > numberOfProjects) return
        if (sortOrder === "n" && initialProjectsForNew.length === 0) return

        const allProjects = projectsList.current.children
        const lastProject = allProjects[allProjects.length - 1]

        if (lastProject.id === "observed") return
        lastProject.id = "observed"

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        observer.unobserve(lastProject)
                        ;(async () => {
                            changeLoading(true)
                            lastProject.id = null
                            const page = Math.floor(moreProjects.length / 6) + 2
                            const longSortOrder = sortOrder === "r" ? "recommended" : "new"
                            const res = await fetch("/api/projects?sort_order=" + longSortOrder + "&page=" + page)
                            const newProjects = await res.json()
                            changeLoading(false)
                            updateMoreProjects(newProjects)
                        })()
                    }
                })
            },
            { threshold: 0.7 }
        )
        observer.observe(lastProject)
    }, [initialProjectsForNew, moreProjects, sortOrder])

    return (
        <div className={`${layout} ${layoutPadding}`}>
            <Head>
                <title>Projects List</title>
            </Head>
            <header>
                <Link href="/">
                    <a className={`${link} ${navLink}`}>
                        <img src="/right-arrow.svg" />
                        Home
                    </a>
                </Link>
            </header>
            <main>
                <div className={infoContainer}>
                    <h1 className={`${title} ${projectsTitle}`}>Projects List</h1>
                    <div className={sortOptions}>
                        <p className={`${sortOrder !== "r" ? lightText : ""}`} onClick={() => !loading && changeSortOrder("r")}>
                            Recommended
                        </p>
                        <div className={divider} />
                        <p className={`${sortOrder !== "n" ? lightText : ""}`} onClick={() => !loading && changeSortOrder("n")}>
                            New
                        </p>
                    </div>
                </div>
                <div className={`${cardsContainer} ${projectsContainer}`} ref={projectsList}>
                    {sortOrder === "r" && staticProjects.map((data) => <ProjectCard data={data} key={data.id} />)}
                    {sortOrder === "n" && initialProjectsForNew.map((data) => <ProjectCard data={data} key={data.id} />)}
                    {moreProjects.length > 0 && moreProjects.map((data) => <ProjectCard data={data} key={data.id} />)}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const numberOfProjects = getNumberOfProjects()
    const staticProjects = getRecommendedProjects()

    return {
        props: {
            numberOfProjects,
            staticProjects,
        },
    }
}
