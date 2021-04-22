import Head from "next/head"
import { useEffect, useState } from "react"
import getHomePageProjects from "../library/operations"
import Header from "../components/Header"
import LatestProjects from "../components/LatestProject"
import About from "../components/About"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import { layout } from "../styles/utils.module.scss"

export default function Home({ projects, setLastPage }) {
    const [loadGoogleRecaptcha, setLoadGoogleRecaptcha] = useState(false)

    useEffect(() => {
        setLoadGoogleRecaptcha(true)
        setLastPage("home")
    }, [])

    return (
        <div className={layout}>
            <Head>
                <title>My Portfolio</title>
                {loadGoogleRecaptcha && <script src="https://www.google.com/recaptcha/api.js" async defer />}
            </Head>
            <Header />
            <main>
                <LatestProjects projects={projects} />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const projects = getHomePageProjects()
    return { props: { projects } }
}
