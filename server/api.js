/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const mongoose = require("mongoose");

// import models so we can interact with the database
const Dormspam = require("./models/dormspam");
const User = require("./models/user");
const auth = require("./auth");
const mail = require("./mail");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// ***** Dormspam stuff *****
router.get("/dormspams", (req, res) => {
    const skip = req.query.skip;
    Dormspam.find({}, undefined, { skip, limit: 24 })
        .sort({ date: -1 })
        .then((dormspams) => {
            res.send(dormspams);
        });
});

router.get("/dormspam-count", (req, res) => {
    Dormspam.countDocuments().then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-count", (req, res) => {
    Dormspam.countDocuments({ $text: { $search: req.query.query } }).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-tag-count", (req, res) => {
    const tagList = req.query.tags.split(",");
    Dormspam.countDocuments({ tag: { $in: tagList } }).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-tag", (req, res) => {
    const skip = req.query.skip;
    const tagList = req.query.tags.split(",");
    Dormspam.find({ tag: { $in: tagList } }, undefined, { skip, limit: 24 })
        .sort({ date: -1 })
        .then((results) => {
            res.send(results);
        });
});

router.get("/dormspam-search", (req, res) => {
    const skip = req.query.skip;
    Dormspam.find(
        { $text: { $search: req.query.query } },
        { score: { $meta: "textScore" } },
        { skip, limit: 24 }
    )
        .sort({ date: -1, score: { $meta: "textScore" } })
        .then((results) => {
            res.send(results);
        });
});

router.get("/dormspam", (req, res) => {
    const objectID = mongoose.Types.ObjectId(req.query.id);
    Dormspam.findById(objectID).then((dormspam) => {
        res.send(dormspam);
    });
});

// ***** User stuff *****
router.get("/userbyemail", (req, res) => {
    User.findOne({ email: req.query.email }).then((user) => {
        if (user === null) {
            console.log("User not found");
            res.send({});
        } else {
            res.send(user);
        }
    });
});

router.get("/user", (req, res) => {
    User.findById(req.query.userid).then((user) => {
        res.send(user);
    });
});

router.get("/whoami", (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        // user is not logged in
        res.send({});
    }
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);

router.post("/createuser", (req, res) => {
    // check that email isn't already taken
    User.findOne({ email: req.body.email }).then((user) => {
        if (user !== null) {
            res.send({});
        }
        auth.hashPass(req.body.password).then((hash) => {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            newUser.save().then((user) => res.send(user));
        });
    });
});

// ***** Email stuff *****
router.post("/sendemail", (req, res) => {
    mail.sendDormspam(req.body).then((resCode) => {
        res.send({ status: resCode });
    });
});

// ***** Everything else (i.e. error) *****
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
