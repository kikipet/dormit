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

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/dormspams", (req, res) => {
    const skip = req.query.skip;
    Dormspam.find({}, undefined, { skip, limit: 24 }).then((dormspams) => {
        res.send(dormspams);
    });
});

router.get("/dormspam", (req, res) => {
    const objectID = mongoose.Types.ObjectId(req.query.id);
    Dormspam.find({ _id: objectID }).then((dormspam) => {
        res.send(dormspam);
    });
});

// router.post("/story", (req, res) => {
//   const newStory = new Story({
//       creator_name: 'songk',
//       content: req.body.content,
//   });
//   newStory.save().then((story) => res.send(story));
// });

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
