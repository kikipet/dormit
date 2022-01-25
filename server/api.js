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

function getStarQuery(starInput) {
    let stars = starInput.split(",");
    if (stars.length !== 0 && stars[0] !== "") {
        for (var s in stars) {
            stars[s] = mongoose.Types.ObjectId(stars[s]);
        }
    } else {
        stars = [];
    }
    return { $in: stars };
}

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// ***** Dormspam stuff *****
router.get("/dormspams", (req, res) => {
    let query = {};
    let sortQuery = {};
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    if (req.query.sort === "date") {
        sortQuery = { date: -1 };
    }
    const skip = req.query.skip;
    Dormspam.find(query, undefined, { skip, limit: 24 })
        .sort(sortQuery)
        .then((dormspams) => {
            res.send(dormspams);
        });
});

router.get("/dormspam-count", (req, res) => {
    let query = {};
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    Dormspam.countDocuments(query).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-count", (req, res) => {
    let query = { $text: { $search: req.query.text } };
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    Dormspam.countDocuments(query).then((count) => {
        res.send({ count: count });
    });
});

router.get("/dormspam-search-tag-count", (req, res) => {
    const tagList = req.query.tagList.split(",");
    let query = { tag: { $in: tagList } };
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    Dormspam.countDocuments(query).then((count) => {
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
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
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
    let timeQuery = {};
    let sortQuery = {};
    if (req.query.text !== "") {
        query.$text = { $search: req.query.text };
    }
    if (tagList.length !== 0 && tagList.length !== 7 && tagList[0] !== "") {
        query.tag = { $in: tagList };
    }
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
    if (req.query.sort === "date") {
        sortQuery = { date: -1 };
    }
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    // send query
    if (req.query.text !== "") {
        Dormspam.find(query, { score: { $meta: "textScore" } }, { skip, limit: 24 })
            .sort({ ...sortQuery, score: { $meta: "textScore" } })
            .then((results) => {
                res.send(results);
            });
    } else {
        Dormspam.find(query, undefined, { skip, limit: 24 })
            .sort(sortQuery)
            .then((results) => {
                res.send(results);
            });
    }
});

router.get("/dormspam-search-tag", (req, res) => {
    const skip = req.query.skip;
    const tagList = req.query.tagList.split(",");
    let query = { tag: { $in: tagList } };
    let sortQuery = {};
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    sortQuery = { date: -1 };
    Dormspam.find(query, undefined, { skip, limit: 24 })
        .sort(sortQuery)
        .then((results) => {
            res.send(results);
        });
});

router.get("/dormspam-search", (req, res) => {
    const skip = req.query.skip;
    let query = { $text: { $search: req.query.text } };
    let sortQuery = {};
    if (req.query.star === "true") {
        query._id = getStarQuery(req.query.stars);
    }
    if (req.query.sort === "date") {
        sortQuery = { date: -1, score: { $meta: "textScore" } };
    } else {
        sortQuery = { score: { $meta: "textScore" }, date: -1 };
    }
    Dormspam.find(query, { score: { $meta: "textScore" } }, { skip, limit: 24 })
        .sort(sortQuery)
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

router.get("/stars", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    }
    res.send({ stars: req.user.stars });
});

router.post("/toggle-star", (req, res) => {
    if (!req.user) {
        res.status(401).send({ msg: "not logged in" });
    }
    if (req.body.star) {
        req.user.stars.splice(req.user.stars.indexOf(req.body.dormspam), 1);
    } else {
        req.user.stars.push(req.body.dormspam);
    }
    User.updateOne({ _id: req.user._id }, req.user).then((res2) => {
        res.send({ id: req.body.dormspam });
    });
});

// ***** User stuff *****
router.get("/userbyemail", (req, res) => {
    User.findOne({ email: req.query.email }).then((user) => {
        if (user === null) {
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
            res.send({});
        } else if (user.confirmed) {
            res.send({ result: "dupe" });
        } else {
            user.confirmed = true;
            User.updateOne({ _id: user._id }, user).then((res2) => {
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
        }
        User.updateOne({ _id: req.user._id }, req.user).then((res2) => {
            res.send({ status: resCode });
        });
    });
});

// ***** Everything else (i.e. error) *****
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
