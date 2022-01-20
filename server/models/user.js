const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    confirmed: Boolean,
    email: String,
    confirmToken: String,
    password: String,
    drafts: Array,
    stars: Array,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
