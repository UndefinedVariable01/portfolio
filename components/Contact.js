import Image from "next/image"
import ContactForm from "./ContactForm"
import utils from "../styles/utils.module.scss"
import styles from "../styles/Contact.module.scss"

const { sectionGapTop, blockImageContainer } = utils
const { contact, title, container, intro, info, imageContainer, formContainer } = styles

export default function Contact() {
    return (
        <div className={`${sectionGapTop} ${contact}`} id="contact">
            <h1 className={title}>Let's Have A Talk</h1>
            <div className={container}>
                <div className={intro}>
                    <p className={info}>
                        You Have Something You Want To Talk To Me About? Send It From Here. I'll Response As Soon As I Can.
                    </p>
                    <div className={`${imageContainer} ${blockImageContainer}`}>
                        <Image src="/contact.png" alt="Contact" width={500} height={625} />
                    </div>
                </div>
                <div className={formContainer}>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
