import Image from "next/image"
import Navbar from "./Navbar"
import utils from "../styles/utils.module.scss"
import styles from "../styles/Header.module.scss"

const { border } = utils
const { wrapper, container, primaryTitle, firstTitle, secondTitle, backgroundImage } = styles

export default function Header() {
    return (
        <header className={wrapper}>
            <Navbar />
            <div className={container}>
                <h1 className={`${primaryTitle} ${firstTitle}`}>
                    making
                    <br />
                    websites
                    <br />
                    for
                    <br />
                    today
                </h1>
                <div className={`${backgroundImage} ${border}`}>
                    <Image src="/header-first.jpg" alt="First Background" layout="fill" objectFit="cover" priority={true} />
                </div>
            </div>
            <div className={container}>
                <div className={`${backgroundImage} ${border}`}>
                    <Image src="/header-second.jpg" alt="Second Background" layout="fill" objectFit="cover" priority={true} />
                </div>
                <h1 className={`${primaryTitle} ${secondTitle}`}>
                    coding
                    <br />
                    for
                    <br />
                    the
                    <br />
                    future
                </h1>
            </div>
        </header>
    )
}
