import styles from "../styles/Footer.module.scss"
const { footer, text, icon } = styles

export default function Footer() {
    return (
        <footer className={`${footer}`}>
            <p className={text}>Designed And Developed By Uva</p>
            <a href="https://github.com/UndefinedVariable01">
                <img className={icon} src="/github.svg" />
            </a>
        </footer>
    )
}
