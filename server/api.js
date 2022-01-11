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

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/dormspams", (req, res) => {
    const skip = req.query.skip;
    Dormspam.find({}, undefined, { skip, limit: 24 }).then((dormspams) => {
        res.send(dormspams);
    });
});

router.get("/dormspam-count", (req, res) => {
    Dormspam.countDocuments().then((count) => {
        res.send(count);
    });
});

router.get("/dormspam", (req, res) => {
    const objectID = mongoose.Types.ObjectId(req.query.id);
    Dormspam.findById(objectID).then((dormspam) => {
        res.send(dormspam);
    });
});

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
            res.send(1);
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

// router.get("/comment", (req, res) => {
//   Comment.find({ parent: req.query.parent }).then((comments) => {
//     res.send(comments);
//   });
// });

// router.post("/comment", (req, res) => {
//     const newComment = new Comment({
//         creator_name: 'songk',
//         parent: req.body.parent,
//         content: req.body.content,
//     });
//     newComment.save().then((comment) => res.send(comment));
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
