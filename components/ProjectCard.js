import Link from "next/link"
import Image from "next/image"
import utils from "../styles/utils.module.scss"
import styles from "../styles/ProjectCard.module.scss"

const { border, blockImageContainer } = utils
const { projectCard, container, shadow, image, title } = styles

export default function ProjectCard({ data }) {
    return (
        <Link href={`project/${data.id}`}>
            <a className={projectCard}>
                <div className={container}>
                    <div className={shadow} />
                    <div className={`${border} ${blockImageContainer} ${image}`}>
                        <Image src={data.imageUrl} alt={data.title} width={data.imageSize.width} height={data.imageSize.height} />
                    </div>
                </div>
                <h2 className={title}>{data.title}</h2>
            </a>
        </Link>
    )
}
