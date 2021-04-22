import Image from "next/image"
import utils from "../styles/utils.module.scss"
import styles from "../styles/About.module.scss"

const { sectionGapTop, sectionGapBottom, blockImageContainer } = utils
const { about, title, imageContainer, container, c1, c2, c3, c4, c5, c6, c7, c8, c9, question, answer } = styles

export default function About() {
    const birthDate = new Date("1999-04-25")
    const now = new Date()
    const ageDate = new Date(now.getTime() - birthDate.getTime())
    const ageYears = ageDate.getUTCFullYear() - 1970

    return (
        <div className={`${sectionGapTop} ${sectionGapBottom} ${about}`} id="about">
            <h1 className={title}>Wanna Know More About Me?</h1>
            <div className={`${imageContainer} ${blockImageContainer}`}>
                <Image src="/about.png" alt="About" width={500} height={532} />
            </div>
            <div className={`${container} ${c1}`}>
                <p className={question}>What's your name?</p>
                <p className={answer}>uva</p>
            </div>
            <div className={`${container} ${c2}`}>
                <p className={question}>Are you a boy or a girl?</p>
                <p className={answer}>i'm a boy</p>
            </div>
            <div className={`${container} ${c3}`}>
                <p className={question}>How old are you?</p>
                <p className={answer}>{ageYears} years old</p>
            </div>
            <div className={`${container} ${c4}`}>
                <p className={question}>Are your a front-end or back-end developer?</p>
                <p className={answer}>both, i'm a full-stack web developer</p>
            </div>
            <div className={`${container} ${c5}`}>
                <p className={question}>How long have your been coding for?</p>
                <p className={answer}>
                    {ageYears - 18} years({ageYears - 20}.5 years web dev)
                </p>
            </div>
            <div className={`${container} ${c6}`}>
                <p className={question}>What technologies can you work with?</p>
                <p className={answer}>
                    Html, Css, Sass, Materialize, Bootstrap, Tailwind, Javascript, Webpack, React, Redux, Nextjs, Nodejs, Express, Mongodb,
                    Photoshop, Adobe Xd, and …
                </p>
            </div>
            <div className={`${container} ${c7}`}>
                <p className={question}>What technologies do you like the most?</p>
                <p className={answer}>React and Nextjs(for having such a great community and documentation)</p>
            </div>
            <div className={`${container} ${c8}`}>
                <p className={question}>Where do you live currently?</p>
                <p className={answer}>Kermanshah, Iran</p>
            </div>
            <div className={`${container} ${c9}`}>
                <p className={question}>How can i contact you?</p>
                <p className={answer}>You can use my email: uva00110001@gmail.com or the contact form below</p>
            </div>
        </div>
    )
}
