import Link from "next/link"
import ProjectCard from "./ProjectCard"
import utils from "../styles/utils.module.scss"
import styles from "../styles/LatestProjects.module.scss"

const { sectionGapTop, sectionGapBottom, link, cardsContainer } = utils
const { container, title, showMoreLink } = styles

export default function LatestProjects({ projects }) {
    return (
        <div className={`${sectionGapTop} ${sectionGapBottom}`} id="projects">
            <div className={container}>
                <h1 className={title}>My Latest Projects</h1>
                <Link href="/projects">
                    <a className={`${link} ${showMoreLink}`}>
                        Show More <img src="/right-arrow.svg" />
                    </a>
                </Link>
            </div>
            <div className={cardsContainer}>
                {projects.map((data) => (
                    <ProjectCard data={data} key={data.id} />
                ))}
            </div>
        </div>
    )
}
