const mongoose = require("mongoose");

const DormspamSchema = new mongoose.Schema({
    title: String,
    author: String,
    address: String,
    date: { type: Date, default: Date.now },
    body: String,
    bctalk: {
        type: String,
        analyzer: "lucene.simple",
    },
    tag: String,
});

module.exports = mongoose.model("dormspam", DormspamSchema);
