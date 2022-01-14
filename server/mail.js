const nodemailer = require("nodemailer");

function sendDormspam(emailContent) {
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

    // get name (or not)
    let senderName = "dormit-send";
    if (emailContent.senderName !== "") {
        senderName = emailContent.senderName;
    }

    // add bc-talk and tag
    let emailText = emailContent.text;
    let emailHTML = emailContent.html;
    emailText += `\nbcc'd to dorms, ${emailContent.bctalk} for bc-talk\n${emailContent.tag} for dormit`;
    emailHTML += `<p>bcc'd to dorms, <span style="font-weight: bold; color: ${emailContent.color};">${emailContent.bctalk}</span> for bc-talk</p><p>${emailContent.tag} for dormit</p>`;

    // construct messages
    const messageTemplate = {
        from: `${senderName} <${process.env.SEND_USER}>`,
        to: emailContent.to,
        cc: emailContent.cc,
        bcc: [],
        subject: emailContent.subject,
        text: emailText,
        html: emailHTML,
    };
    let messageBCC = JSON.parse(JSON.stringify(messageTemplate));
    messageBCC.bcc = ["dormit-devtest-next@mit.edu", "dormit-devtest-sponge@mit.edu"];

    let messageMaseeh = JSON.parse(JSON.stringify(messageTemplate));
    messageMaseeh.to.push("dormit-devtest-maseeh@mit.edu");

    // this one doesn't actually exist
    let messageBaker = JSON.parse(JSON.stringify(messageTemplate));
    messageBaker.to.push("dormit-devtest-baker@mit.edu");

    // this one doesn't exist either
    let messageNV = JSON.parse(JSON.stringify(messageTemplate));
    messageNV.to.push("dormit-devtest-nv@mit.edu");

    // send!
    return transporter.sendMail(messageBCC).then(() => {
        console.log("Message with bcc sent successfully");
        transporter.sendMail(messageMaseeh).then(() => {
            console.log("Message to Maseeh sent successfully");
            return 0;
        });
    });
}

module.exports = { sendDormspam };
