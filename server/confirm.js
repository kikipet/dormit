const nodemailer = require("nodemailer");
const crypto = require("crypto");

function sendConfirmEmail(emailContent) {
    // define transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SEND_USER,
            pass: process.env.SEND_PASS,
        },
    });

    // define email body text
    // I'd better change those links when the time comes
    let emailText = `Hi, thanks for signing up at dormit! Go to the link below to confirm your account:\n\
        "localhost:5000/confirm/${emailContent.emailHashed}"\n\
        Best,\n\
        dormit-admin`;
    let emailHTML = `<div style="font-family: Mulish, sans-serif; color: #3e394e;">\
            <p>\
                Hi, thanks for signing up at dormit! Click the button below to confirm your account:\
            </p>\
            <p>\
                <a\
                    href="localhost:5000/confirm/${emailContent.emailHashed}"\
                    style="background-color: #7a94fc; color: white; padding: 12px 16px; border-radius: 6px; text-decoration: none; font-weight: bold; font-family: Mulish, sans-serif;"\
                >\
                    Confirm Account\
                </a>\
            </p>\
            <p>Best,</p>\
            <p>dormit-admin</p>\
        </div>`;

    // construct message
    const message = {
        from: `dormit-confirm-email <${process.env.SEND_USER}>`,
        to: emailContent.email,
        subject: "Confirm your dormit account",
        text: emailText,
        html: emailHTML,
    };

    // send!
    return transporter.sendMail(message).then(() => {
        console.log("Confirmation email sent successfully");
    });
}

function confirmToken() {
    return crypto.randomBytes(16).toString("hex");
}

module.exports = { sendConfirmEmail, confirmToken };
