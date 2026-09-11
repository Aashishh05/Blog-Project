import { transporter } from "../config/nodeMailer"



const sendEmail = async({to,subject,html}) => {
await transporter.sendMail({
    from:process.env.SMTP_USER,
    to:email
})
}