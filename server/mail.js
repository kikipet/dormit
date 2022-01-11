const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

function sendDormspam() {
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SEND_USER,
            pass: process.env.SEND_PASS,
        },
    });

    let messageBCC = {
        // uh let's hardcode stuff for now
        from: {
            name: "dormit-send",
            address: process.env.SEND_USER,
        },
        // from: "Song Kim <songk@mit.edu>",
        bcc: ["dormit-devtest-next@mit.edu", "dormit-devtest-sponge@mit.edu"],
        subject: "test",
        text: "hello world?",
        html: "<p>hello world?</p>",
    };

    let messageMaseeh = {
        // uh let's hardcode stuff for now
        from: {
            name: "dormit-send",
            address: process.env.SEND_USER,
        },
        // from: "Song Kim <songk@mit.edu>",
        to: ["dormit-devtest-maseeh@mit.edu"],
        subject: "test",
        text: "hello world?",
        html: "<p>hello world?</p>",
    };

    // this one doesn't actually exist
    let messageBaker = {
        // uh let's hardcode stuff for now
        from: {
            name: "dormit-send",
            address: process.env.SEND_USER,
        },
        // from: "Song Kim <songk@mit.edu>",
        to: ["dormit-devtest-baker@mit.edu"],
        subject: "test",
        text: "hello world?",
        html: "<p>hello world?</p>",
    };

    // this one doesn't actually exist
    let messageNV = {
        // uh let's hardcode stuff for now
        from: {
            name: "dormit-send",
            address: process.env.SEND_USER,
        },
        // from: "Song Kim <songk@mit.edu>",
        to: ["dormit-devtest-nv@mit.edu"],
        subject: "test",
        text: "hello world?",
        html: "<p>hello world?</p>",
    };

    transporter.sendMail(messageBCC, (error, info) => {
        if (error) {
            console.log(error.message);
            return process.exit(1);
        }

        console.log("Message sent successfully");
    });
}

module.exports = { sendDormspam };
