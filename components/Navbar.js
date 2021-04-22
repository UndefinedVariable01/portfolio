import { useState } from "react"
import styles from "../styles/Navbar.module.scss"

const {
    navbar,
    navContainer,
    openMenu,
    closeBtn,
    showMenuBg,
    closeBtnBg,
    showCloseBtnBg,
    closeIcon,
    showCloseIcon,
    closeIconLine,
    navLinks,
    navLink,
    showNavLink,
    menuIcon,
    menuIconLine,
    brand,
} = styles

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false)
    const [animation, setAnimation] = useState({})

    async function handleOpenMenu() {
        if (animation.animating) return

        setNavOpen(true)

        const executeFirstStep = setTimeout(() => {
            clearTimeout(executeFirstStep)
            setAnimation({ animating: true, first: true })
        }, 0)

        const executeSecondStep = setTimeout(() => {
            clearTimeout(executeSecondStep)
            setAnimation((previousState) => ({ ...previousState, second: true }))
        }, 200)

        const executeThirdStep = setTimeout(() => {
            clearTimeout(executeThirdStep)
            setAnimation((previousState) => ({ ...previousState, third: true }))
        }, 300)

        const executeForthStep = setTimeout(() => {
            clearTimeout(executeForthStep)
            setAnimation((previousState) => ({ ...previousState, forth: true }))
        }, 500)

        const executeFifthStep = setTimeout(() => {
            clearTimeout(executeFifthStep)
            setAnimation((previousState) => ({ ...previousState, animating: false }))
        }, 800)
    }

    function handleCloseMenu() {
        if (animation.animating) return

        setAnimation((previousState) => ({ ...previousState, forth: false, animating: true }))

        const executeSecondStep = setTimeout(() => {
            clearTimeout(executeSecondStep)
            setAnimation((previousState) => ({ ...previousState, third: false }))
        }, 200)

        const executeThirdStep = setTimeout(() => {
            clearTimeout(executeThirdStep)
            setAnimation((previousState) => ({ ...previousState, second: false }))
        }, 300)

        const executeForthStep = setTimeout(() => {
            clearTimeout(executeForthStep)
            setAnimation((previousState) => ({ ...previousState, first: false }))
        }, 600)

        const executeFifthStep = setTimeout(() => {
            clearTimeout(executeFifthStep)
            setNavOpen(false)
            setAnimation({})
        }, 1000)
    }

    return (
        <nav className={navbar}>
            <div className={`${navContainer} ${navOpen ? openMenu : ""} ${animation.first ? showMenuBg : ""}`}>
                <div className={closeBtn} onClick={handleCloseMenu}>
                    <div className={`${closeBtnBg} ${animation.third ? showCloseBtnBg : ""}`} />
                    <div className={`${closeIcon} ${animation.forth ? showCloseIcon : ""}`}>
                        <div className={closeIconLine} />
                        <div className={closeIconLine} />
                    </div>
                </div>
                <ul className={navLinks}>
                    <li className={`${navLink} ${animation.second ? showNavLink : ""}`}>
                        <a href="#projects" onClick={handleCloseMenu}>
                            Projects
                        </a>
                    </li>
                    <li className={`${navLink} ${animation.second ? showNavLink : ""}`}>
                        <a href="#about" onClick={handleCloseMenu}>
                            About
                        </a>
                    </li>
                    <li className={`${navLink} ${animation.second ? showNavLink : ""}`}>
                        <a href="#contact" onClick={handleCloseMenu}>
                            Contact
                        </a>
                    </li>
                </ul>
            </div>

            <div className={menuIcon} onClick={handleOpenMenu}>
                <div className={menuIconLine} />
                <div className={menuIconLine} />
            </div>

            <a className={brand} href="/">
                My Portfolio.
            </a>
        </nav>
    )
}
