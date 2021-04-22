import { connectToDatabase } from "../../util/mongodb"

export default async (req, res) => {
    const validInputs = validateInputs(req.body)
    if (!validInputs) return res.json({ fail: true })

    const recaptchaVerification = await verifyRecaptcha(validInputs.token)
    if (!recaptchaVerification) return res.json({ fail: true })

    const { db } = await connectToDatabase()
    await db.collection("messages").insertOne(validInputs)
    res.json({ success: true })
}

function validateInputs(inputs) {
    const { name, contact, message, token } = inputs

    if (!contact || !message || !token) return false
    if (typeof contact !== "string" || typeof message !== "string" || typeof token !== "string") return false
    if (name && (typeof name !== "string" || name.length < 3 || name.length > 32)) return false
    if (contact.length < 3 || contact.length > 128) return false
    if (message.length < 3 || message.length > 1024) return false
    if (token.length < 3 || token.length > 1024) return false

    if (name) return { name, contact, message, token }
    return { contact, message, token }
}

async function verifyRecaptcha(token) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    const res = await fetch(url, { method: "POST" })
    const result = await res.json()
    return result.success
}
