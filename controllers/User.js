const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authenticateRequired = function (req, rsp, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        next();
    } else {
        rsp.status(401).send({ errors: { message: "Unauthorized" } })
    }
}

module.exports.signup = async (req, rsp) => {
    const { first_name, last_name, email, password: plaintextpassword } = req.body
    if (!plaintextpassword || !first_name || !last_name || !email) {
        rsp.status(500).json({ errors: { message: "Must fill in all required fields" } })
    } else {
        const password = bcrypt.hashSync(plaintextpassword, 10)
        const created_at = Date.now()
        try {
            const user = await db.createUser({ first_name, last_name, email, password, created_at })
            rsp.status(200).json(user)
        } catch (err) {
            rsp.send(err)
        }
    }
}

module.exports.login = async (req, rsp) => {
    const { email, password } = req.body;
    try {
        const results = await db.findUserByEmail(email)
        if (results.length === 0) {
            rsp.status(404).json({ errors: { message: "User not found" } })
        } else {
            const user = results[0]
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name }, "ROOM_RESERVATION_REST_API")
                    rsp.status(200).json({ status: "Success", token })
                } else {
                    rsp.status(500).json({ errors: { message: "Wrong password" } })
                }
            })
        }
    } catch (err) {
        rsp.json(err)
    }
}

module.exports.updateUser = async (req, rsp) => {
    var user = jwt.decode(req.headers.authorization.split(' ')[1])
    try {
        if (req.body.first_name) { user.first_name = req.body.first_name }
        if (req.body.last_name) { user.last_name = req.body.last_name }
        if (req.body.password) { user.password = bcrypt.hashSync(req.body.password, 10) }
        const { first_name, last_name, password } = user
        const updatedUser = await db.updateUser({ first_name, last_name, password }, user.email)
        rsp.json(updatedUser)
    } catch (err) {
        rsp.json({ errors: { message: err } })
    }
}