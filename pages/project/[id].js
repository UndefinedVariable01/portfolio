import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { getAllProjectPaths, findProject } from "../../library/operations"
import Footer from "../../components/Footer"
import utils from "../../styles/utils.module.scss"
import styles from "../../styles/Project.module.scss"

const { layout, link, border, blockImageContainer } = utils
const {
    wrapper,
    navLink,
    projectContainer,
    imageContainer,
    projectImage,
    shadow,
    title,
    date,
    description,
    tools,
    linksContainer,
    infoLink,
} = styles

export default function Project({ project, lastPage }) {
    const projectDate = new Date(project.date)
    const day = projectDate.getDate()
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(projectDate)
    const year = projectDate.getFullYear()

    return (
        <div className={`${layout} ${wrapper}`}>
            <Head>
                <title>{project.title}</title>
            </Head>
            <header>
                <nav>
                    <Link href={lastPage === "projects" ? "/projects" : "/"}>
                        <a className={`${link} ${navLink}`}>
                            <img src="/right-arrow.svg" /> Go Back
                        </a>
                    </Link>
                </nav>
            </header>
            <main>
                <div className={projectContainer}>
                    <div className={imageContainer}>
                        <div className={shadow} />
                        <a className={`${border} ${projectImage} ${blockImageContainer}`} href={project.demoLink}>
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                width={project.imageSize.width}
                                height={project.imageSize.height}
                                priority={true}
                            />
                        </a>
                    </div>
                    <h1 className={title}>{project.title}</h1>
                    <p className={date}>
                        <span>{day}</span>
                        <span>{month}</span>
                        <span>{year}</span>
                    </p>
                    {project.description && <p className={description}>{project.description}</p>}
                    <p className={tools}>
                        Tools: <span>{project.tools}</span>
                    </p>
                    {(project.demoLink || project.githubLink) && (
                        <div className={linksContainer}>
                            {project.demoLink && (
                                <a className={`${link} ${infoLink}`} href={project.demoLink}>
                                    <img src="/select.svg" /> See Live Demo
                                </a>
                            )}
                            {project.githubLink && (
                                <a className={`${link} ${infoLink}`} href={project.githubLink}>
                                    <img src="/select.svg" /> Go to Github Page
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export async function getStaticPaths() {
    const paths = getAllProjectPaths()
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const project = findProject(params.id)
    return {
        props: {
            project,
        },
    }
}
