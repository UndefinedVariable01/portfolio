import { useEffect, useState } from "react"
import styles from "../styles/Contact.module.scss"

const { fieldGap, inputsContainer, inputField, label, input, textarea, submitContainer, submitBtn, loadingImage, alertText } = styles

export default function ContactForm() {
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [message, setMessage] = useState("")

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (!alert) return
        const removeAlert = setTimeout(() => {
            clearTimeout(removeAlert)
            setAlert(false)
        }, 4000)
    }, [alert])

    async function handleSubmission(e) {
        e.preventDefault()
        if (loading) return

        try {
            const token = grecaptcha.getResponse()
            if (!token) return setAlert("Please Confirm You Are Not A Robot!")
            setAlert(null)

            setLoading(true)

            const res = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, contact, message, token }),
            })
            const result = await res.json()

            setLoading(false)
            grecaptcha.reset()

            if (result.success) setAlert("Your Message Has Been Sent Successfully.")
            else setSubmissionResult("Someting Went Wrong, Please Try Again Later!")
        } catch (err) {
            setAlert("Unable To Make The Request, Please Make Sure You Are Connected To The Internet!")
        }
    }

    function checkMinLength(e, minLength, errorMessage) {
        if (e.target.value.length > 0 && e.target.value.length < minLength) e.target.setCustomValidity(errorMessage)
    }

    return (
        <form onSubmit={handleSubmission}>
            <div className={`${fieldGap} ${inputsContainer}`}>
                <div className={inputField}>
                    <label className={label} htmlFor="name">
                        Your Name (Optional)
                    </label>
                    <input
                        className={input}
                        name="name"
                        type="text"
                        maxLength="32"
                        value={name}
                        onBlur={(e) => checkMinLength(e, 3, "Name should be at least 3 characters long!")}
                        onChange={(e) => {
                            e.target.setCustomValidity("")
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className={inputField}>
                    <label className={label} htmlFor="contact">
                        How Do I Contact You?
                    </label>
                    <input
                        className={input}
                        name="contact"
                        type="text"
                        maxLength="128"
                        required
                        value={contact}
                        onBlur={(e) => checkMinLength(e, 3, "Contact should be at least 3 characters long!")}
                        onChange={(e) => {
                            e.target.setCustomValidity("")
                            setContact(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className={fieldGap}>
                <label className={label} htmlFor="message">
                    So, What You Want To Talk About?
                </label>
                <textarea
                    className={textarea}
                    name="message"
                    maxLength="1024"
                    required
                    value={message}
                    onBlur={(e) => checkMinLength(e, 3, "Message should be at least 3 characters long!")}
                    onChange={(e) => {
                        e.target.setCustomValidity("")
                        setMessage(e.target.value)
                    }}
                />
            </div>
            <div className={`g-recaptcha ${fieldGap}`} data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY} />
            <div className={submitContainer}>
                <button className={submitBtn} type="submit">
                    Sned Your Message
                </button>
                {loading && <img className={loadingImage} src="/loading.svg" />}
            </div>
            {alert && <p className={alertText}>{alert}</p>}
        </form>
    )
}
