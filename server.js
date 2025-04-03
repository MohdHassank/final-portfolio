require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD 
    }
});

app.post("/send-email", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Error sending email." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
