import styles from "../styles/Footer.module.scss"
const { footer, text, icon } = styles

export default function Footer() {
    return (
        <footer className={`${footer}`}>
            <p className={text}>Designed And Developed By m0hammadr3za</p>
            <a href="https://github.com/m0hammadr3za">
                <img className={icon} src="/github.svg" />
            </a>
        </footer>
    )
}
