const bcrypt = require("bcrypt");
const User = require("./models/user");

const saltRounds = 10;

function login(req, res) {
    // *** This code assumes that this user exists! ***
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (result) {
                        console.log(`Logged in as ${user.name}`);

                        // persist user in the session
                        req.session.user = user;
                        res.send(user);
                    } else {
                        console.log("Incorrect login");
                        res.send({});
                    }
                })
                .catch((err) => console.error(err.message));
        })
        .catch((err) => {
            console.log(`Failed to log in: ${err}`);
            res.status(401).send({ err });
        });
}

function hashPass(plaintext) {
    // returns a promise
    return bcrypt.hash(plaintext, saltRounds).then((hash) => {
        return hash;
    });
}

function logout(req, res) {
    if (req.user) console.log(`${req.user.name} logged out`);
    req.session.user = null;
    res.send({});
}

function populateCurrentUser(req, res, next) {
    // simply populate "req.user" for convenience
    req.user = req.session.user;
    next();
}

function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        return res.status(401).send({ err: "not logged in" });
    }

    next();
}

module.exports = {
    login,
    logout,
    populateCurrentUser,
    ensureLoggedIn,
};

module.exports = { hashPass, login, logout, populateCurrentUser, ensureLoggedIn };
