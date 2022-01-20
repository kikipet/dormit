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
const confirm = require("./confirm");

function isEmpty(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
}

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
    Dormspam.countDocuments({ $text: { $search: req.query.text } }).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-tag-count", (req, res) => {
    const tagList = req.query.tagList.split(",");
    Dormspam.countDocuments({ tag: { $in: tagList } }).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-advanced-count", (req, res) => {
    // construct query?
    const tagList = req.query.tagList.split(",");
    let query = {};
    if (req.query.text !== "") {
        query.$text = { $search: req.query.text };
    }
    if (tagList.length !== 0 && tagList.length !== 7 && tagList[0] !== "") {
        query.tag = { $in: tagList };
    }
    let timeQuery = {};
    if (req.query.timeStart !== "") {
        timeQuery.$gte = req.query.timeStart;
    }
    if (req.query.timeEnd !== "") {
        timeQuery.$lte = req.query.timeEnd;
    }
    if (!isEmpty(timeQuery)) {
        query.date = timeQuery;
    }
    if (req.query.bctalk !== "") {
        query.bctalk = req.query.bctalk;
    }
    // send query
    Dormspam.countDocuments(query).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-advanced", (req, res) => {
    const skip = req.query.skip;
    // construct query?
    const tagList = req.query.tagList.split(",");
    let query = {};
    if (req.query.text !== "") {
        query.$text = { $search: req.query.text };
    }
    if (tagList.length !== 0 && tagList.length !== 7 && tagList[0] !== "") {
        query.tag = { $in: tagList };
    }
    let timeQuery = {};
    if (req.query.timeStart !== "") {
        timeQuery.$gte = req.query.timeStart;
    }
    if (req.query.timeEnd !== "") {
        timeQuery.$lte = req.query.timeEnd;
    }
    if (!isEmpty(timeQuery)) {
        query.date = timeQuery;
    }
    if (req.query.bctalk !== "") {
        query.bctalk = req.query.bctalk;
    }
    console.log(query);
    // send query
    if (req.query.text !== "") {
        Dormspam.find(query, { score: { $meta: "textScore" } }, { skip, limit: 24 })
            .sort({ date: -1, score: { $meta: "textScore" } })
            .then((results) => {
                res.send(results);
            });
    } else {
        Dormspam.find(query, undefined, { skip, limit: 24 })
            .sort({ date: -1 })
            .then((results) => {
                res.send(results);
            });
    }
});

router.get("/dormspam-search-tag", (req, res) => {
    const skip = req.query.skip;
    const tagList = req.query.tagList.split(",");
    Dormspam.find({ tag: { $in: tagList } }, undefined, { skip, limit: 24 })
        .sort({ date: -1 })
        .then((results) => {
            res.send(results);
        });
});

router.get("/dormspam-search", (req, res) => {
    const skip = req.query.skip;
    Dormspam.find(
        { $text: { $search: req.query.text } },
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
            res.send(user);
        }
        auth.hashPass(req.body.password).then((passHash) => {
            const token = confirm.confirmToken();
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                confirmToken: token,
                password: passHash,
                confirmed: false,
            });
            newUser.save().then((user2) => {
                confirm
                    .sendConfirmEmail({ email: req.body.email, confirmToken: token })
                    .then((resCode) => {
                        res.send({});
                    });
            });
        });
    });
});

router.get("/confirmuser", (req, res) => {
    User.findOne({ confirmToken: req.query.confirmToken }).then((user) => {
        if (user === null) {
            console.log("User not found");
            res.send({});
        } else if (user.confirmed) {
            console.log("User already confirmed");
            res.send({ result: "dupe" });
        } else {
            user.confirmed = true;
            User.updateOne({ _id: user._id }, user).then((res2) => {
                console.log("user confirmed");
                res.send({ ...user, result: "success" });
            });
        }
    });
});

// ***** Email stuff *****
// if any of the draft functions get called with a null userId, an error should be raised
router.get("/getdrafts", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    } else {
        res.send(req.user.drafts);
    }
});

router.get("/getdraft", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    } else {
        res.send(req.user.drafts[req.query.draftNum]);
    }
});

router.post("/createdraft", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    }
    req.user.drafts.push(req.body.draft);
    User.updateOne({ _id: req.user._id }, req.user).then((res2) => {
        res.send(req.user.drafts);
    });
});

router.post("/savedraft", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    }
    console.log(req.body.draftNum);
    req.user.drafts[req.body.draftNum] = req.body.draft;
    User.updateOne({ _id: req.user._id }, req.user).then((res2) => {
        res.send(req.user.drafts);
    });
});

router.post("/deletedraft", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    }
    if (req.body.draft) {
        req.user.drafts.splice(req.body.draftNum, 1);
        console.log(`removed draft ${req.body.draftNum} from database`);
        User.updateOne({ _id: req.user._id }, req.user).then((res2) => {
            res.send(req.body.draftNum);
        });
    }
});

router.post("/sendemail", (req, res) => {
    // send emails
    mail.sendDormspam(req.body).then((resCode) => {
        if (req.user && req.body.draft) {
            // if this was a draft, remove from user's draft list
            req.user.drafts.splice(req.body.draftNum, 1);
            console.log(`removed draft ${req.body.draftNum} from database`);
        }
        User.updateOne({ _id: req.user._id }, req.user).then((res2) => {
            res.send({ status: resCode });
        });
    });
});

// ***** Everything else (i.e. error) *****
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
